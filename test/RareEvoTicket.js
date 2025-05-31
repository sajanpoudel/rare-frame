const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('RareEvoTicket', function () {
  let ticket, owner, buyer, other;
  const price = ethers.parseEther('0.0001');

  beforeEach(async function () {
    [owner, buyer, other] = await ethers.getSigners();
    const RareEvoTicket = await ethers.getContractFactory('RareEvoTicket');
    ticket = await RareEvoTicket.deploy();
    await ticket.waitForDeployment();
  });

  describe('mintTicket', function () {
    it('mints token 0 to the buyer and emits TicketMinted', async function () {
      await expect(ticket.connect(buyer).mintTicket({ value: price }))
        .to.emit(ticket, 'TicketMinted')
        .withArgs(buyer.address, 0);
      expect(await ticket.ownerOf(0)).to.equal(buyer.address);
    });

    it('hands out token ids in order', async function () {
      await ticket.connect(buyer).mintTicket({ value: price });
      await ticket.connect(other).mintTicket({ value: price });
      expect(await ticket.ownerOf(1)).to.equal(other.address);
    });

    it('reverts when the payment is too low', async function () {
      await expect(ticket.connect(buyer).mintTicket({ value: price - 1n })).to.be.revertedWith(
        'Insufficient payment'
      );
    });

    it('starts unclaimed', async function () {
      await ticket.connect(buyer).mintTicket({ value: price });
      const details = await ticket.getTicketDetails(0);
      expect(details.claimed).to.equal(false);
      expect(details.registrantName).to.equal('');
    });
  });

  describe('claimTicket', function () {
    beforeEach(async function () {
      await ticket.connect(buyer).mintTicket({ value: price });
    });

    it('stores the registrant details and emits TicketClaimed', async function () {
      await expect(
        ticket.connect(buyer).claimTicket(0, 'Ada', 'ada@example.com', 'Analytical')
      ).to.emit(ticket, 'TicketClaimed');
      const details = await ticket.getTicketDetails(0);
      expect(details.claimed).to.equal(true);
      expect(details.registrantName).to.equal('Ada');
      expect(details.registrantCompany).to.equal('Analytical');
      expect(await ticket.tokenURI(0)).to.equal('ipfs://claimed-ticket-metadata-0');
    });

    it('only lets the owner claim', async function () {
      await expect(
        ticket.connect(other).claimTicket(0, 'Eve', 'eve@example.com', 'Evil')
      ).to.be.revertedWith('Not ticket owner');
    });

    it('cannot be claimed twice', async function () {
      await ticket.connect(buyer).claimTicket(0, 'Ada', 'ada@example.com', 'Analytical');
      await expect(
        ticket.connect(buyer).claimTicket(0, 'Ada', 'ada@example.com', 'Analytical')
      ).to.be.revertedWith('Ticket already claimed');
    });
  });

  describe('getTicketDetails', function () {
    it('reverts for a ticket that does not exist', async function () {
      await expect(ticket.getTicketDetails(5)).to.be.revertedWith('Ticket does not exist');
    });
  });

  describe('withdrawFunds', function () {
    it('sends the balance to the owner', async function () {
      await ticket.connect(buyer).mintTicket({ value: price });
      await expect(ticket.withdrawFunds()).to.changeEtherBalances([ticket, owner], [-price, price]);
    });

    it('is restricted to the owner', async function () {
      await expect(ticket.connect(buyer).withdrawFunds()).to.be.revertedWithCustomError(
        ticket,
        'OwnableUnauthorizedAccount'
      );
    });
  });

  describe("metadata", function () {
    it("has the expected name and symbol", async function () {
      expect(await ticket.name()).to.equal("Rare Evo 2025 Ticket");
      expect(await ticket.symbol()).to.equal("REVO");
    });

    it("exposes the price and supply limits", async function () {
      expect(await ticket.TICKET_PRICE()).to.equal(price);
      expect(await ticket.MAX_TICKETS()).to.equal(1000n);
    });

    it("supports the ERC721 interface", async function () {
      expect(await ticket.supportsInterface("0x80ac58cd")).to.equal(true);
    });

    it("gives new tickets the default metadata uri", async function () {
      await ticket.connect(buyer).mintTicket({ value: price });
      expect(await ticket.tokenURI(0)).to.equal("ipfs://default-ticket-metadata");
    });
  });

  describe("ownership", function () {
    it("makes the deployer the owner", async function () {
      expect(await ticket.owner()).to.equal(owner.address);
    });

    it("lets a new owner withdraw after ownership is transferred", async function () {
      await ticket.connect(buyer).mintTicket({ value: price });
      await ticket.transferOwnership(other.address);
      await expect(ticket.connect(other).withdrawFunds()).to.changeEtherBalances([ticket, other], [-price, price]);
      await expect(ticket.withdrawFunds()).to.be.revertedWithCustomError(ticket, "OwnableUnauthorizedAccount");
    });

    it("withdrawing with an empty balance succeeds", async function () {
      await expect(ticket.withdrawFunds()).to.not.be.reverted;
    });
  });
});
