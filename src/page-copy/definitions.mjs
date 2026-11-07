/**
 * Editable page copy.
 *
 * Each page below gets its own EmDash collection with a single entry
 * (slug "main"). The values here are the current site copy: they're used to
 * create the entries, and as a fallback so the page renders the same even if
 * an entry is missing or a field is left empty.
 *
 * Field tuple: [slug, type, label, default]
 *   - "string" / "text"  → edited inline on the page
 *   - "list"             → Portable Text bullet list, edited inline. Default is
 *                          an array of lines using **bold**, *italic*, [text](url)
 *   - "repeater"         → rows edited in the admin; default is an array of objects
 */

export const EDGEWISE_URL = "https://getaword.in";
export const TOGETHER_LETTERS_URL = "https://togetherletters.com";
export const ENABLE_GOOD_URL = "https://enablegood.io";

const companiesField = [
	"companies",
	"repeater",
	"Companies",
	[
		{ role: "Executive Director", name: "48in48", description: "1,700+ nonprofit websites built over 11 years.", url: "https://48in48.org", highlight: false },
		{ role: "Podcast production", name: "Edgewise Media", description: "Create marketing content fast through podcasts.", url: EDGEWISE_URL, highlight: false },
		{ role: "Stay connected", name: "Together Letters", description: "Stay connected with the people important to you, outside of social media.", url: TOGETHER_LETTERS_URL, highlight: false },
		{ role: "My consulting", name: "Enable Good", description: "Marketing and technology consulting for nonprofits.", url: ENABLE_GOOD_URL, highlight: true },
	],
	[
		{ slug: "role", label: "Label (small caps)", type: "string" },
		{ slug: "name", label: "Name", type: "string", required: true },
		{ slug: "description", label: "Description", type: "text" },
		{ slug: "url", label: "Link", type: "url" },
		{ slug: "highlight", label: "Gold card", type: "boolean" },
	],
];

export const PAGES = [
	{
		slug: "home_page",
		label: "Homepage",
		fields: [
			["hero_kicker", "string", "Hero: handwritten line", "marketing, tech & leadership, minus the hype"],
			["hero_tagline", "string", "Hero: tagline", "Husband. Father of five. Wearer of fedoras."],
			["hero_highlight", "string", "Hero: highlighted words", "Helper of nonprofits."],
			["hats_intro", "string", "Hero: two hats intro", "At work, I wear two hats:"],
			["subscribe_note", "string", "Hero: newsletter note", "Weekly marketing newsletter, delivered through Substack."],
			["photo_caption", "string", "Hero: photo caption", "the fedora stays on"],
			["currently_1", "string", "Currently strip: item 1", "Fractional CMO & Technology Lead"],
			["currently_2", "string", "Currently strip: item 2", "Executive Director, 48in48"],
			["currently_3", "string", "Currently strip: item 3", "Co-host, Tech Talk, Y’all"],
			["hats_kicker", "string", "Two hats: handwritten line", "two hats, one fedora"],
			["hats_heading", "string", "Two hats: heading", "Marketing lead. Technology lead. Or both."],
			["hats_lead", "text", "Two hats: intro", "I make complex ideas and messages easy to understand, whether the thing that’s stuck is your message or your tools."],
			["cmo_kicker", "string", "Marketing card: handwritten line", "the marketing hat"],
			["cmo_title", "string", "Marketing card: title", "Fractional CMO"],
			["cmo_tagline", "string", "Marketing card: tagline", "Is your marketing broken? I can help fix it."],
			["cmo_list", "list", "Marketing card: list", [
				"**Fractional CMO** — three months or longer, leading your team to build and execute a plan",
				"**Marketing leadership** — someone who owns the message, the plan, and the results",
			]],
			["cmo_link", "string", "Marketing card: link text", "Hire the marketing lead →"],
			["tech_kicker", "string", "Technology card: handwritten line", "the technology hat"],
			["tech_title", "string", "Technology card: title", "Technology Lead"],
			["tech_tagline", "string", "Technology card: tagline", "AI without the hype. Tech your team will actually use."],
			["tech_list", "list", "Technology card: list", [
				"**Tech strategy & roadmap** — what to buy, build, and stop paying for",
				"**AI adoption & training** — where AI saves real time, and where it doesn’t",
				"**Websites & digital** — rebuilds, re-platforms, and the tools around them",
				"**Systems & tools** — CRM, donor database, project tools, automations",
			]],
			["tech_link", "string", "Technology card: link text", "Hire the technology lead →"],
			["hats_footnote", "string", "Two hats: footnote", "Especially for nonprofits: built on 11 years and 1,700+ nonprofit websites with 48in48."],
			["writing_kicker", "string", "Writing: handwritten line", "from the notebook"],
			["writing_heading", "string", "Writing: heading", "Writing"],
			["writing_button", "string", "Writing: button", "Browse all writing"],
			["make_kicker", "string", "Podcast & companies: handwritten line", "things I make & run"],
			["make_heading", "string", "Podcast & companies: heading", "The Podcast & the Companies"],
			["cta_kicker", "string", "Call to action: handwritten line", "is it the message or the tools?"],
			["cta_heading", "string", "Call to action: heading", "Either way, I can help fix it."],
			["cta_lead", "text", "Call to action: text", "Bring me in as your Fractional CMO, your Technology Lead, or both. For nonprofits and growing businesses."],
			["cta_button", "string", "Call to action: main button", "Let’s build something awesome"],
			["cta_button_2", "string", "Call to action: second button", "See how I work"],
			["superpower_kicker", "string", "Superpower: handwritten line", "my superpower"],
			["superpower_quote", "text", "Superpower: quote", "“I make complex ideas and messages easy to understand.”"],
			["newsletter_line_1", "string", "Newsletter: heading line 1", "One email a week."],
			["newsletter_line_2", "string", "Newsletter: heading line 2", "Practical, short, no hype."],
			["newsletter_note", "string", "Newsletter: note", "Marketing, tech, and leadership from a dad of five and student of stoicism."],
		],
	},
	{
		slug: "now_page",
		label: "Now page",
		fields: [
			["kicker", "string", "Handwritten line", "what I’m up to these days"],
			["heading", "string", "Heading", "Now"],
			["updated", "string", "Last updated", "November 2026"],
			["lead", "text", "Intro", "A snapshot of where my time and attention are going right now. If it’s not on this page, I’m probably saying no to it."],
			["work_heading", "string", "At work: heading", "At work"],
			["work_list", "list", "At work: list", [
				"Wearing two hats: **Fractional CMO** and **Technology Lead** for growing businesses. [How I work →](/work-with-me)",
				"Helping nonprofits with technology and marketing through **Enable Good**. AI without the hype.",
				"Executive Director of **48in48**, which has built 1,700+ nonprofit websites over 11 years.",
			]],
			["building_heading", "string", "Building: heading", "Building"],
			["building_list", "list", "Building: list", [
				"**Edgewise Media**: creating marketing content fast through podcasts.",
				"**Together Letters**: staying connected with the people important to you, outside of social media.",
				"This website, rebuilt from WordPress onto EmDash and Astro.",
			]],
			["mic_heading", "string", "On the mic: heading", "On the mic"],
			["mic_list", "list", "On the mic: list", [
				"Co-hosting **Tech Talk, Y’all** with Sanjay Parekh. [Listen →](https://techtalkyall.com)",
			]],
			["reading_heading", "string", "Reading: heading", "Reading"],
			["streak_text", "string", "Reading: streak line (the day count updates itself)", "Still reading an hour a day. Current streak:"],
			["book_label", "string", "Reading: book label", "On the nightstand:"],
			["book_title", "string", "Reading: current book", "Theo of Golden"],
			["home_heading", "string", "At home: heading", "At home"],
			["home_list", "list", "At home: list", [
				"Husband, father of five, in Lilburn, Georgia.",
				"Studying stoicism, one hard morning at a time.",
			]],
			["photo_caption", "string", "At home: photo caption", "the whole crew"],
			["no_heading", "string", "Saying no to: heading", "Saying no to"],
			["no_list", "list", "Saying no to: list", ["Time wasters.", "Social media doom scrolling."]],
			["cta_kicker", "string", "Newsletter box: handwritten line", "want the weekly version?"],
			["cta_text", "string", "Newsletter box: text", "One email a week. Practical, short, no hype."],
			["cta_button", "string", "Newsletter box: button", "Subscribe on Substack"],
		],
	},
	{
		slug: "speaking_page",
		label: "Speaking page",
		fields: [
			["kicker", "string", "Handwritten line", "on stage, fedora included"],
			["heading", "string", "Heading", "Speaking"],
			["lead", "text", "Intro", "Talks and workshops on marketing, technology, and leadership, minus the hype. I make complex ideas easy to understand, and I bring that to the room."],
			["button", "string", "Button", "Book Adam for your event"],
			["photo_caption", "string", "Photo caption", "between sessions"],
			["talks_kicker", "string", "Talks: handwritten line", "what I talk about"],
			["talks_heading", "string", "Talks: heading", "Talks"],
			["talks", "repeater", "Talks", [
				{ tag: "Marketing", title: "Best Practices Are Just Average Practices", description: "Copying what everyone else does gets you average results. This talk shows how to spot the contrarian moves that actually fit your organization, and how to test them without betting the farm. For marketing teams, founders, and nonprofit leaders tired of playing it safe.", formats: "Keynote · Workshop", highlight: false },
				{ tag: "Technology", title: "AI Without the Hype", description: "A plain-English look at where AI saves real time for small teams and where it’s just a shiny distraction. Attendees leave with a short list of tools and habits they can put to work Monday morning. For nonprofit staff, executives, and small business owners.", formats: "Keynote · Workshop", highlight: true },
				{ tag: "Leadership", title: "What 1,000 Days of Reading Taught Me About Leading", description: "Lessons from reading an hour a day, every day, for more than three years: on focus, consistency, and becoming the kind of leader people want to follow. For leadership teams and anyone trying to build a habit that actually sticks.", formats: "Keynote", highlight: false },
			], [
				{ slug: "tag", label: "Topic tag", type: "string" },
				{ slug: "title", label: "Title", type: "string", required: true },
				{ slug: "description", label: "Description", type: "text" },
				{ slug: "formats", label: "Formats", type: "string" },
				{ slug: "highlight", label: "Gold card", type: "boolean" },
			]],
			["formats_heading", "string", "Formats: heading", "Ways I show up"],
			["formats", "repeater", "Formats", [
				{ name: "Keynotes", length: "30–45 minutes" },
				{ name: "Workshops", length: "90 minutes to a half day" },
				{ name: "Panels & fireside chats", length: "30–60 minutes" },
				{ name: "Podcast guest", length: "30–60 minutes, remote or in studio" },
			], [
				{ slug: "name", label: "Format", type: "string", required: true },
				{ slug: "length", label: "Length", type: "string" },
			]],
			["events_heading", "string", "Events: heading", "Where I’ve spoken"],
			["events", "repeater", "Events", [
				{ name: "WordCamp ATL", note: "Atlanta", highlight: false },
				{ name: "WordCamp London", note: "London", highlight: false },
				{ name: "WIT Career Expo", note: "Women in Technology", highlight: false },
				{ name: "48in48 Global", note: "Nonprofit tech event", highlight: true },
			], [
				{ slug: "name", label: "Event", type: "string", required: true },
				{ slug: "note", label: "Note", type: "string" },
				{ slug: "highlight", label: "Dark card", type: "boolean" },
			]],
			["book_kicker", "string", "Booking: handwritten line", "bring me in"],
			["book_heading", "string", "Booking: heading", "Book Adam for your event."],
			["book_lead", "text", "Booking: text", "Tell me about the room and what you want people to walk away with."],
		],
	},
	{
		slug: "work_page",
		label: "Work with me page",
		fields: [
			["kicker", "string", "Hero: handwritten line", "is your marketing broken?"],
			["lead", "text", "Hero: intro", "Most teams need someone to lead the message, someone to lead the tools, or both. I’ve founded two marketing agencies (sold one, still growing the other), served as a nonprofit CMO, and led 48in48 as it built 1,700+ nonprofit websites."],
			["button", "string", "Hero: main button", "Let’s work together"],
			["button_2", "string", "Hero: second button", "See how I help"],
			["stat_1_number", "string", "Stat 1: number", "1,700+"],
			["stat_1_label", "string", "Stat 1: label", "nonprofit websites built through 48in48 over 11 years"],
			["stat_2_number", "string", "Stat 2: number", "2"],
			["stat_2_label", "string", "Stat 2: label", "marketing agencies founded, one sold"],
			["superpower_kicker", "string", "Superpower: handwritten line", "my superpower"],
			["superpower_quote", "text", "Superpower: quote", "“I make complex ideas and messages easy to understand.”"],
			["services_kicker", "string", "Businesses: handwritten line", "for businesses"],
			["services_heading", "string", "Businesses: heading", "Two ways to work together"],
			["services_lead", "text", "Businesses: intro", "For growing businesses, the help usually comes down to one of two seats at the leadership table: someone to lead your marketing, or someone to lead your technology."],
			["cmo_kicker", "string", "Marketing card: handwritten line", "the marketing hat"],
			["cmo_title", "string", "Marketing card: title", "Fractional CMO"],
			["cmo_tagline", "string", "Marketing card: tagline", "Marketing leadership, without hiring a full-time executive."],
			["cmo_text", "text", "Marketing card: text", "A three-month (or longer) engagement where I lead your marketing team to build and execute a plan."],
			["cmo_list", "list", "Marketing card: list", [
				"**Right for you if** your marketing feels broken, or no one owns it",
				"**Engagement** three months or longer",
			]],
			["cmo_button", "string", "Marketing card: button", "Talk about marketing →"],
			["tech_kicker", "string", "Technology card: handwritten line", "the technology hat"],
			["tech_title", "string", "Technology card: title", "Technology Lead"],
			["tech_tagline", "string", "Technology card: tagline", "A technology plan, and someone to lead it."],
			["tech_text", "text", "Technology card: text", "What to buy, what to build, and what to stop paying for, plus putting AI to work without the hype."],
			["tech_list", "list", "Technology card: list", [
				"**Tech strategy & roadmap**",
				"**AI adoption & training**",
				"**Websites, systems & tools**",
			]],
			["tech_button", "string", "Technology card: button", "Talk about technology →"],
			["both_kicker", "string", "Need both: handwritten line", "need both?"],
			["both_text", "string", "Need both: text", "Message and tools usually break together. I can wear both hats."],
			["both_link", "string", "Need both: link", "Let’s talk →"],
			["np_kicker", "string", "Nonprofits: handwritten line", "for nonprofits"],
			["np_heading", "string", "Nonprofits: heading", "AI without the hype."],
			["np_lead", "text", "Nonprofits: intro", "Practical technology your staff and volunteers will actually use. Built on 11 years and 1,700+ nonprofit websites with 48in48."],
			["np_brand_line", "string", "Nonprofits: brand line", "My nonprofit work runs through"],
			["np_brand", "string", "Nonprofits: brand name", "Enable Good"],
			["np_button", "string", "Nonprofits: button", "Talk nonprofit tech"],
			["np_1_title", "string", "Nonprofit card 1: title", "Tech strategy & roadmap"],
			["np_1_text", "text", "Nonprofit card 1: text", "What to buy, what to build, and what to stop paying for. A clear plan sized to your team and budget."],
			["np_2_title", "string", "Nonprofit card 2: title", "AI adoption & training"],
			["np_2_text", "text", "Nonprofit card 2: text", "Hands-on training that shows your staff and volunteers where AI saves real time, and where it doesn’t."],
			["np_3_title", "string", "Nonprofit card 3: title", "Websites & digital"],
			["np_3_text", "text", "Nonprofit card 3: text", "Site rebuilds and re-platforms, plus the digital tools that sit around them."],
			["np_4_title", "string", "Nonprofit card 4: title", "Systems & tools"],
			["np_4_text", "text", "Nonprofit card 4: text", "Choosing and setting up your CRM, donor database, project tools, and automations so the work stops living in inboxes."],
			["contact_kicker", "string", "Contact: handwritten line", "let’s talk"],
			["contact_heading", "string", "Contact: heading", "Let’s work together & build something awesome."],
			["contact_lead", "text", "Contact: intro", "Tell me what feels broken. I’ll read every note myself."],
			["contact_signoff", "string", "Contact: handwritten sign-off", "thanks, I’m looking forward to connecting with you"],
		],
	},
	{
		slug: "podcast_page",
		label: "Podcast & Companies page",
		fields: [
			["kicker", "string", "Handwritten line", "things I make & run"],
			["heading", "string", "Heading", "The Podcast & the Companies"],
			["show_kicker", "string", "Podcast: handwritten line", "on the mic"],
			["show_title", "string", "Podcast: name", "Tech Talk, Y’all"],
			["show_text", "string", "Podcast: description", "My podcast, co-hosted with Sanjay Parekh."],
			["show_button", "string", "Podcast: button", "Listen to the show →"],
			["companies_kicker", "string", "Companies: handwritten line", "behind the desk"],
			companiesField,
		],
	},
];

// ---------------------------------------------------------------------------
// Portable Text from simple markup
// ---------------------------------------------------------------------------

let keyCounter = 0;
const key = (prefix) => `${prefix}${(keyCounter++).toString(36)}`;

/** Turn one line of **bold** / *italic* / [text](url) markup into a list block. */
function lineToBlock(line, prefix) {
	const markDefs = [];
	const children = [];
	const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
	let last = 0;
	let m;
	const push = (text, marks = []) => text && children.push({ _type: "span", _key: key(prefix + "s"), text, marks });
	while ((m = re.exec(line))) {
		push(line.slice(last, m.index));
		if (m[1]) push(m[1], ["strong"]);
		else if (m[2]) push(m[2], ["em"]);
		else {
			const k = key(prefix + "l");
			markDefs.push({ _key: k, _type: "link", href: m[4] });
			push(m[3], [k]);
		}
		last = re.lastIndex;
	}
	push(line.slice(last));
	return { _type: "block", _key: key(prefix + "b"), style: "normal", listItem: "bullet", level: 1, markDefs, children };
}

export function listToPortableText(lines, prefix = "k") {
	return lines.map((l) => lineToBlock(l, prefix));
}

/** Default data for one page entry, in the shape EmDash stores. */
export function defaultData(page) {
	const data = { title: page.label };
	for (const [slug, type, , def] of page.fields) {
		data[slug] = type === "list" ? listToPortableText(def, slug.replace(/_/g, "").slice(0, 6)) : def;
	}
	return data;
}

/** EmDash field definitions for one page collection. */
export function fieldDefinitions(page) {
	return [
		{ slug: "title", label: "Title", type: "string" },
		...page.fields.map(([slug, type, label, , subFields]) => ({
			slug,
			label,
			type: type === "list" ? "portableText" : type,
			...(type === "repeater" ? { validation: { subFields } } : {}),
		})),
	];
}

export const DEFAULTS = Object.fromEntries(PAGES.map((p) => [p.slug, defaultData(p)]));
