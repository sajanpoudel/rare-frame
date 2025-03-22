import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Extract the button index that was clicked
    const buttonIndex = body?.untrustedData?.buttonIndex;
    const inputText = body?.untrustedData?.inputText;
    const fid = body?.untrustedData?.fid;
    
    // Default image for the frame
    let imageUrl = 'https://rareevo.io/og-image.jpg';
    let frameHtml = '';
    
    // Handle different button actions
    switch (buttonIndex) {
      case 1: // Mint New Ticket
        imageUrl = 'https://rareevo.io/mint-ticket.jpg';
        frameHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${imageUrl}" />
              <meta property="fc:frame:button:1" content="Connect Wallet" />
              <meta property="fc:frame:button:2" content="Back to Home" />
              <meta property="fc:frame:post_url" content="https://your-api-endpoint.com/frame" />
            </head>
          </html>
        `;
        break;
        
      case 2: // Register Ticket
        imageUrl = 'https://rareevo.io/register-ticket.jpg';
        frameHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${imageUrl}" />
              <meta property="fc:frame:input:text" content="Enter your wallet address" />
              <meta property="fc:frame:button:1" content="Register" />
              <meta property="fc:frame:button:2" content="Back to Home" />
              <meta property="fc:frame:post_url" content="https://your-api-endpoint.com/frame" />
            </head>
          </html>
        `;
        break;
        
      case 3: // View Ticket
        // If input text is provided, use it as wallet address to look up ticket
        const walletAddress = inputText || '0x...';
        
        // In a real implementation, you would fetch ticket data from the blockchain
        // For demo purposes, we'll generate a QR code image URL
        imageUrl = `https://rareevo.io/ticket-qr.jpg?wallet=${walletAddress}&fid=${fid}`;
        
        frameHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${imageUrl}" />
              <meta property="fc:frame:button:1" content="Flip Ticket" />
              <meta property="fc:frame:button:2" content="Back to Home" />
              <meta property="fc:frame:post_url" content="https://your-api-endpoint.com/frame" />
            </head>
          </html>
        `;
        break;
        
      default:
        // Default home frame
        frameHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${imageUrl}" />
              <meta property="fc:frame:button:1" content="Mint New Ticket" />
              <meta property="fc:frame:button:2" content="Register Ticket" />
              <meta property="fc:frame:button:3" content="View My Ticket" />
              <meta property="fc:frame:post_url" content="https://your-api-endpoint.com/frame" />
              <meta property="fc:frame:aspect_ratio" content="1.91:1" />
            </head>
          </html>
        `;
    }
    
    return new NextResponse(frameHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
    
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 