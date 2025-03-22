// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract RareEvoTicket is ERC721URIStorage, Ownable {
    // Replace Counters with a simple uint256
    uint256 private _nextTokenId;
    
    uint256 public constant TICKET_PRICE = 0.0001 ether;
    uint256 public constant MAX_TICKETS = 1000;
    
    struct TicketData {
        bool claimed;
        string registrantName;
        string registrantEmail;
        string registrantCompany;
        uint256 claimTimestamp;
    }
    
    mapping(uint256 => TicketData) public ticketDetails;
    
    event TicketMinted(address indexed buyer, uint256 indexed tokenId);
    event TicketClaimed(uint256 indexed tokenId, string registrantName, uint256 timestamp);
    
    constructor() ERC721("Rare Evo 2025 Ticket", "REVO") Ownable(msg.sender) {}
    
    function mintTicket() public payable returns (uint256) {
        require(msg.value >= TICKET_PRICE, "Insufficient payment");
        require(_nextTokenId < MAX_TICKETS, "All tickets sold out");
        
        uint256 newTokenId = _nextTokenId++;
        
        _safeMint(msg.sender, newTokenId);
        
        // Set default metadata URI
        _setTokenURI(newTokenId, "ipfs://default-ticket-metadata");
        
        ticketDetails[newTokenId] = TicketData({
            claimed: false,
            registrantName: "",
            registrantEmail: "",
            registrantCompany: "",
            claimTimestamp: 0
        });
        
        emit TicketMinted(msg.sender, newTokenId);
        return newTokenId;
    }
    
    function claimTicket(
        uint256 tokenId,
        string memory name,
        string memory email,
        string memory company
    ) public {
        require(ownerOf(tokenId) == msg.sender, "Not ticket owner");
        require(!ticketDetails[tokenId].claimed, "Ticket already claimed");
        
        ticketDetails[tokenId].claimed = true;
        ticketDetails[tokenId].registrantName = name;
        ticketDetails[tokenId].registrantEmail = email;
        ticketDetails[tokenId].registrantCompany = company;
        ticketDetails[tokenId].claimTimestamp = block.timestamp;
        
        // Update metadata URI with claimed status
        _setTokenURI(tokenId, string(abi.encodePacked("ipfs://claimed-ticket-metadata-", Strings.toString(tokenId))));
        
        emit TicketClaimed(tokenId, name, block.timestamp);
    }
    
    function getTicketDetails(uint256 tokenId) public view returns (TicketData memory) {
        require(_ownerOf(tokenId) != address(0), "Ticket does not exist");
        return ticketDetails[tokenId];
    }
    
    function withdrawFunds() public onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }
    
    // The supportsInterface function is now properly inherited from ERC721URIStorage
} 