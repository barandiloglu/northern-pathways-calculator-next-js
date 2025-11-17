import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

const SOURCE =
  "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html";

interface DrawData {
  roundNumber: string;
  date: string;
  roundType: string;
  invitationsIssued: string;
  crsScore: string;
}

// Use the SAME parsing logic that works on client-side
function parseDrawDataFromHTML(html: string): DrawData[] {
  try {
    const $ = cheerio.load(html);
    const draws: DrawData[] = [];

    // Find all table rows in the tbody - same as client-side
    $("tbody tr").each((index: number, element: any) => {
      const $row = $(element);
      const cells = $row.find("td");

      if (cells.length >= 5) {
        // Extract data from each cell - same logic as client-side
        const $roundNumberCell = $(cells[0]);
        const $dateCell = $(cells[1]);
        const $roundTypeCell = $(cells[2]);
        const $invitationsCell = $(cells[3]);
        const $crsCell = $(cells[4]);

        // Extract round number from the first cell (might be a link or empty)
        let roundNumber = "";
        const $roundLink = $roundNumberCell.find("a");
        if ($roundLink.length > 0) {
          // Extract number from href or text content
          const href = $roundLink.attr("href") || "";
          const text = $roundLink.text().trim();
          const match = href.match(/(\d+)/) || text.match(/(\d+)/);
          roundNumber = match ? match[1] : "";
        } else {
          const cellText = $roundNumberCell.text().trim();
          if (cellText) {
            roundNumber = cellText;
          } else {
            // Generate a round number based on the date (fallback)
            const dateStr = $dateCell.attr("data-order") || $dateCell.text().trim();
            if (dateStr) {
              roundNumber = dateStr.replace(/-/g, "");
            }
          }
        }

        // Extract date - use data-order attribute if available, otherwise text content
        const dateOrder = $dateCell.attr("data-order");
        const date = dateOrder || $dateCell.text().trim();

        // Extract other fields
        const roundType = $roundTypeCell.text().trim();
        const invitationsIssued = $invitationsCell.text().trim();
        const crsScore = $crsCell.text().trim();

        // Only add if we have essential data
        if (roundNumber && date && roundType) {
          draws.push({
            roundNumber,
            date,
            roundType,
            invitationsIssued,
            crsScore,
          });
        }
      }
    });

    return draws;
  } catch (error) {
    console.error("Error parsing HTML:", error);
    return [];
  }
}

export async function GET() {
  try {
    console.log("=== PROXY API: Fetching from Canada.ca ===");
    
    const res = await fetch(SOURCE, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.5",
        "accept-encoding": "gzip, deflate, br",
        connection: "keep-alive",
        "upgrade-insecure-requests": "1",
      },
      next: { revalidate: 60 * 30 }, // 30 minutes cache
    });

    if (!res.ok) {
      console.error("HTTP error:", res.status, res.statusText);
      return NextResponse.json(
        { ok: false, error: `Upstream fetch failed, ${res.status}` },
        { status: 502 }
      );
    }

    const html = await res.text();
    console.log("=== PROXY API: Parsing HTML with client-side logic ===");
    
    const draws = parseDrawDataFromHTML(html);
    
    console.log(`=== PROXY API: Parsed ${draws.length} draws ===`);

    return NextResponse.json(
      {
        ok: true,
        data: draws,
        source: SOURCE,
        updatedAt: new Date().toISOString(),
        dataSource: draws.length > 0 ? "parsed" : "fallback",
      },
      { headers: { "Cache-Control": "s-maxage=21600, stale-while-revalidate=86400" } }
    );
  } catch (error) {
    console.error("Error in proxy API:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error", data: [] },
      { status: 500 }
    );
  }
}

