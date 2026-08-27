/*
 * The 2012 filing cabinet, as data.
 * Every file Luke saved while reading his way through the law that touched
 * his own life, mostly across Christmas 2012. Names, sizes and save-dates
 * are taken straight from the folder; nothing here is invented.
 * Source folder: "Australian Law 2012 - Lukes Relevance" (local archive).
 */
window.CORPUS = {
  domains: {
    bedrock: { label: 'Bedrock', hue: 'gold', blurb: 'The documents everything else stands on: the Constitution and the old machinery of courts and oaths.' },
    world: { label: 'The world stage', hue: 'sky', blurb: 'What Australia has signed up to beyond its own parliaments.' },
    money: { label: 'Money and banking', hue: 'teal', blurb: 'How the dollars in an ordinary account are actually governed.' },
    tax: { label: 'Tax', hue: 'lemon', blurb: 'The rules that take a slice of every payslip and invoice.' },
    super: { label: 'Superannuation', hue: 'coral', blurb: 'The retirement savings system, volume by volume.' },
    work: { label: 'Work and enterprise', hue: 'purple', blurb: 'Jobs, companies, property in things, and ideas.' },
    state: { label: 'The everyday state', hue: 'magenta', blurb: 'Crime, privacy, welfare, health products and open government.' },
    qldlife: { label: 'Queensland daily life', hue: 'stamp', blurb: 'Police, tenancy, transport and the ballot box, state edition.' },
    sea: { label: 'Sea and ships', hue: 'sky', blurb: 'An island continent has a lot of maritime law.' },
    paper: { label: 'Fine print and forms', hue: 'gold', blurb: 'The everyday paperwork that quotes all of the above.' }
  },
  jurisdictions: {
    cth: 'Commonwealth',
    qld: 'Queensland',
    world: 'International',
    private: 'Private fine print'
  },
  files: [
    { file: 'Australian Constitution Act 1900.pdf', title: 'Commonwealth Constitution 1900', dom: 'bedrock', jur: 'cth', mb: 0.2, saved: '2012-12-21', note: 'The rulebook for the rulebooks. Nine parliaments trace their power back to this one document.' },
    { file: 'The Magna Carta.pdf', title: 'Magna Carta 1215', dom: 'bedrock', jur: 'world', mb: 0.1, saved: '2012-12-21', note: 'The 800-year-old ancestor. The opt-out forums quote it constantly; reading it is the cure.' },
    { file: 'Australian Acts Interpretation Amendment Act 2011.pdf', title: 'Acts Interpretation Amendment Act 2011', dom: 'bedrock', jur: 'cth', mb: 0.8, saved: '2012-12-25', note: 'The act about how to read acts. Meta-law: definitions, commencement, how words mean things.' },
    { file: 'QLD - Judicature Act 1876 (Law and Equity).pdf', title: 'Judicature Act 1876 (QLD)', dom: 'bedrock', jur: 'qld', mb: 0.05, saved: '2012-12-19', note: 'How law and equity were fused into one court system. Old, short, still load-bearing.' },
    { file: 'QLD - Oaths Acts 1867.pdf', title: 'Oaths Act 1867 (QLD)', dom: 'bedrock', jur: 'qld', mb: 0.4, saved: '2012-12-19', note: 'What a sworn statement legally is. Another favourite of the opt-out forums, read at the source instead.' },

    { file: 'UN - Universal Declaration of Human Rights.pdf', title: 'Universal Declaration of Human Rights', dom: 'world', jur: 'world', mb: 0.1, saved: '2012-12-20', note: 'The 1948 baseline the world agreed on paper. Not directly enforceable in Australia, and worth knowing anyway.' },
    { file: 'UN Treaties with Australia as Signatory.xls', title: 'UN treaties with Australia as signatory (spreadsheet)', dom: 'world', jur: 'world', mb: 2.0, saved: '2012-12-21', note: 'A spreadsheet of everything Australia has signed. The seed of the treaty layer any cyber republic map would need.' },
    { file: 'G20Australia2014conceptpaper.pdf', title: 'G20 Australia 2014 concept paper', dom: 'world', jur: 'world', mb: 0.5, saved: '2014-01-23', note: 'Saved when the world’s economic ledger came to Brisbane. The cabinet stayed open after 2013.' },

    { file: 'Australian Banking Act 1959.pdf', title: 'Banking Act 1959', dom: 'money', jur: 'cth', mb: 1.4, saved: '2012-12-25', note: 'Who may call themselves a bank and hold your deposits.' },
    { file: 'Australian Bills of Exchange Act 1909.pdf', title: 'Bills of Exchange Act 1909', dom: 'money', jur: 'cth', mb: 0.6, saved: '2012-12-13', note: 'Cheques and promissory notes. Another act the opt-out theories lean on; the text says less magic, more plumbing.' },
    { file: 'Australian Anti-Money Laundering and Counter-Terrorism Financing Act 2006.pdf', title: 'Anti-Money Laundering and Counter-Terrorism Financing Act 2006', dom: 'money', jur: 'cth', mb: 1.5, saved: '2012-12-26', note: 'Why the bank asks who you are. The identity-checking spine of the financial system.' },
    { file: 'Australian Life Insurance Act.pdf', title: 'Life Insurance Act 1995', dom: 'money', jur: 'cth', mb: 1.8, saved: '2012-12-25', note: 'The rules behind every life policy PDS.' },
    { file: 'Australian Financial Management and Accountability Act 1997.pdf', title: 'Financial Management and Accountability Act 1997', dom: 'money', jur: 'cth', mb: 0.7, saved: '2012-12-25', note: 'How the Commonwealth manages its own money. The audit trail for the public purse, as it stood in 2012.' },

    { file: 'Australian A New Tax System (Pay As You Go) Act 1999.pdf', title: 'A New Tax System (Pay As You Go) Act 1999', dom: 'tax', jur: 'cth', mb: 0.5, saved: '2012-12-27', note: 'Why tax leaves your pay before you ever see it.' },
    { file: 'Australian Taxation Administration Act 1953 VOL01.pdf', title: 'Taxation Administration Act 1953, volume 1', dom: 'tax', jur: 'cth', mb: 0.9, saved: '2012-12-18', note: 'The machinery of the tax office: assessments, obligations, penalties.' },
    { file: 'Australian Taxation Administration Act 1953 VOL02.pdf', title: 'Taxation Administration Act 1953, volume 2', dom: 'tax', jur: 'cth', mb: 5.5, saved: '2012-12-18', note: 'Volume two. The single heaviest file in the cabinet.' },
    { file: 'Australian New Business Tax System (Debt and Equity) Act 2001.pdf', title: 'New Business Tax System (Debt and Equity) Act 2001', dom: 'tax', jur: 'cth', mb: 0.3, saved: '2012-12-25', note: 'Where the line between a loan and a share is drawn, for tax.' },
    { file: 'QLD - Taxation Administration Act 2001.pdf', title: 'Taxation Administration Act 2001 (QLD)', dom: 'tax', jur: 'qld', mb: 0.7, saved: '2012-12-18', note: 'The state’s own tax machinery, running in parallel with the Commonwealth’s.' },

    { file: 'Australian Superannuation Act 1976 VOL 1.pdf', title: 'Superannuation Act 1976, volume 1', dom: 'super', jur: 'cth', mb: 1.2, saved: '2012-12-28', note: 'The old Commonwealth super scheme, volume one.' },
    { file: 'Australian Superannuation Act 1976 VOL 2.pdf', title: 'Superannuation Act 1976, volume 2', dom: 'super', jur: 'cth', mb: 2.0, saved: '2012-12-28', note: 'Volume two of the same scheme.' },
    { file: 'Australian Superannuation Act 1990.pdf', title: 'Superannuation Act 1990', dom: 'super', jur: 'cth', mb: 0.8, saved: '2012-12-25', note: 'The successor public sector scheme.' },
    { file: 'Australian Superannuation (leaving australia payments) Act 1990.pdf', title: 'Superannuation (Leaving Australia Payments) Act 1990', dom: 'super', jur: 'cth', mb: 0.03, saved: '2012-12-25', note: 'What happens to super when a person leaves the country. The smallest file in the cabinet.' },
    { file: 'Australian Superannuation Industry (Supervision) Regulations 1994 VOL 1.pdf', title: 'Superannuation Industry (Supervision) Regulations 1994, volume 1', dom: 'super', jur: 'cth', mb: 1.8, saved: '2012-12-28', note: 'The detailed rules every super fund runs on, volume one.' },
    { file: 'Australian Superannuation Industry (Supervision) Regulations 1994 VOL 2.pdf', title: 'Superannuation Industry (Supervision) Regulations 1994, volume 2', dom: 'super', jur: 'cth', mb: 2.1, saved: '2012-12-28', note: 'Volume two of the fund rulebook.' },
    { file: 'QLD - Superannuation (State Public Sector) Act 1990.pdf', title: 'Superannuation (State Public Sector) Act 1990 (QLD)', dom: 'super', jur: 'qld', mb: 0.5, saved: '2012-12-27', note: 'Queensland’s own public sector super law.' },

    { file: 'Australian Fair Work Act 2009.pdf', title: 'Fair Work Act 2009', dom: 'work', jur: 'cth', mb: 3.3, saved: '2012-12-27', note: 'The national workplace rulebook: minimum standards, awards, unfair dismissal.' },
    { file: 'Australian Corporations Act 2001 Volume 1.pdf', title: 'Corporations Act 2001, volume 1', dom: 'work', jur: 'cth', mb: 2.2, saved: '2012-12-25', note: 'The company rulebook, volume one of five. All five were saved on Christmas Day 2012.' },
    { file: 'Australian Corporations Act 2001 Volume 2.pdf', title: 'Corporations Act 2001, volume 2', dom: 'work', jur: 'cth', mb: 2.9, saved: '2012-12-25', note: 'Volume two of five.' },
    { file: 'Australian Corporations Act 2001 Volume 3.pdf', title: 'Corporations Act 2001, volume 3', dom: 'work', jur: 'cth', mb: 1.7, saved: '2012-12-25', note: 'Volume three of five.' },
    { file: 'Australian Corporations Act 2001 Volume 4.pdf', title: 'Corporations Act 2001, volume 4', dom: 'work', jur: 'cth', mb: 3.0, saved: '2012-12-25', note: 'Volume four of five.' },
    { file: 'Australian Corporations Act 2001 Volume 5.pdf', title: 'Corporations Act 2001, volume 5', dom: 'work', jur: 'cth', mb: 3.3, saved: '2012-12-25', note: 'Volume five of five.' },
    { file: 'Australian Personal Property Securities Act 2009.pdf', title: 'Personal Property Securities Act 2009', dom: 'work', jur: 'cth', mb: 0.7, saved: '2012-12-25', note: 'Who really owns a thing when money is owed on it. Created the national PPSR register.' },
    { file: 'Australian Personal Property Securities Act.pdf', title: 'Personal Property Securities Act (second copy)', dom: 'work', jur: 'cth', mb: 1.4, saved: '2012-12-25', note: 'A second, fuller print of the same act. The cabinet kept both.' },
    { file: 'Australian Patents Act 1990.pdf', title: 'Patents Act 1990', dom: 'work', jur: 'cth', mb: 1.2, saved: '2014-11-06', note: 'How an idea becomes property. Added in 2014, when the inventions started needing it.' },

    { file: 'Australian Criminal Code Act 1995.pdf', title: 'Criminal Code Act 1995', dom: 'state', jur: 'cth', mb: 3.2, saved: '2012-12-18', note: 'The Commonwealth’s criminal law in one schedule, from fraud to terrorism.' },
    { file: 'Australian Privacy Act 1988.pdf', title: 'Privacy Act 1988', dom: 'state', jur: 'cth', mb: 1.3, saved: '2012-12-27', note: 'What governments and companies may do with information about you. Read here 13 years before the AI wave made it famous.' },
    { file: 'Australian Freedom of Information Act 1982.pdf', title: 'Freedom of Information Act 1982', dom: 'state', jur: 'cth', mb: 1.2, saved: '2012-12-25', note: 'The right to see what the government holds. The overcompliance toolkit starts here.' },
    { file: 'Australian Social Security Act 1991 VOL1.pdf', title: 'Social Security Act 1991, volume 1', dom: 'state', jur: 'cth', mb: 3.2, saved: '2012-12-27', note: 'The welfare system’s rulebook, volume one of five.' },
    { file: 'Australian Social Security Act 1991 VOL2.pdf', title: 'Social Security Act 1991, volume 2', dom: 'state', jur: 'cth', mb: 3.5, saved: '2012-12-27', note: 'Volume two of five.' },
    { file: 'Australian Social Security Act 1991 VOL3.pdf', title: 'Social Security Act 1991, volume 3', dom: 'state', jur: 'cth', mb: 4.1, saved: '2012-12-27', note: 'Volume three of five, the largest of the set.' },
    { file: 'Australian Social Security Act 1991 VOL4.pdf', title: 'Social Security Act 1991, volume 4', dom: 'state', jur: 'cth', mb: 2.5, saved: '2012-12-27', note: 'Volume four of five.' },
    { file: 'Australian Social Security Act 1991 VOL5.pdf', title: 'Social Security Act 1991, volume 5', dom: 'state', jur: 'cth', mb: 3.0, saved: '2012-12-27', note: 'Volume five of five. All saved in one sitting, two days after Christmas.' },
    { file: 'Australian Theraputic Goods Act 1989.pdf', title: 'Therapeutic Goods Act 1989', dom: 'state', jur: 'cth', mb: 2.6, saved: '2014-11-25', note: 'What may be sold as medicine or a medical device. Added in 2014 alongside the health-tech ideas.' },
    { file: 'Australian Theraputic Goods Regulations.pdf', title: 'Therapeutic Goods Regulations 1990', dom: 'state', jur: 'cth', mb: 1.6, saved: '2014-11-25', note: 'The detailed schedules under the act above.' },

    { file: 'QLD - Police Powers and Responsibilities Act 2000.pdf', title: 'Police Powers and Responsibilities Act 2000 (QLD)', dom: 'qldlife', jur: 'qld', mb: 2.9, saved: '2012-12-25', note: 'Exactly what an officer may and may not do at your door or window. Read on Christmas night.' },
    { file: 'QLD - Police Service Administration Act 1990.pdf', title: 'Police Service Administration Act 1990 (QLD)', dom: 'qldlife', jur: 'qld', mb: 0.8, saved: '2012-12-25', note: 'How the police service itself is run and held to account.' },
    { file: 'QLD - Residential Tenancies and Rooming Accommodation Act 2008.pdf', title: 'Residential Tenancies and Rooming Accommodation Act 2008 (QLD)', dom: 'qldlife', jur: 'qld', mb: 1.1, saved: '2013-01-05', note: 'Every renter’s actual rights, straight from the source. The last file of the summer read.' },
    { file: 'QLD - Electoral Act 1992.pdf', title: 'Electoral Act 1992 (QLD)', dom: 'qldlife', jur: 'qld', mb: 1.3, saved: '2012-12-20', note: 'How Queensland elections legally work. The entry point for anyone who wants to change the rules from inside.' },
    { file: 'QLD - Transport Operations (Road Use Management) Act 1995.pdf', title: 'Transport Operations (Road Use Management) Act 1995 (QLD)', dom: 'qldlife', jur: 'qld', mb: 2.1, saved: '2012-12-18', note: 'Licences, fines and everything between you and the road.' },
    { file: 'QLD - Transport Operations (Passenger Transport) Act 1994.pdf', title: 'Transport Operations (Passenger Transport) Act 1994 (QLD)', dom: 'qldlife', jur: 'qld', mb: 1.4, saved: '2012-12-18', note: 'Buses, taxis and ferries: the law behind the timetable.' },
    { file: 'QLD - Transport Operations (Translink Transit Authority) Act 2008.pdf', title: 'Transport Operations (TransLink Transit Authority) Act 2008 (QLD)', dom: 'qldlife', jur: 'qld', mb: 0.4, saved: '2012-12-21', note: 'The body behind the go card, as constituted in 2012.' },

    { file: 'Australian Navigation Act 1912.pdf', title: 'Navigation Act 1912', dom: 'sea', jur: 'cth', mb: 1.5, saved: '2012-12-25', note: 'A century of maritime law, saved in the same sitting as its replacement.' },
    { file: 'Australian Navigation Act 2012.pdf', title: 'Navigation Act 2012', dom: 'sea', jur: 'cth', mb: 1.1, saved: '2012-12-25', note: 'The brand-new replacement, weeks old when it was filed. Old law and new law, side by side.' },
    { file: 'Australian Shipping Registration Act 1981.pdf', title: 'Shipping Registration Act 1981', dom: 'sea', jur: 'cth', mb: 1.0, saved: '2012-12-25', note: 'How a vessel gets an Australian identity.' },
    { file: 'Australian Limitation of Liability for Maritime Claims Act 1989.pdf', title: 'Limitation of Liability for Maritime Claims Act 1989', dom: 'sea', jur: 'cth', mb: 0.4, saved: '2012-12-25', note: 'Caps on what can be claimed when things go wrong at sea.' },

    { file: 'Westpac Personal Accounts PDS.pdf', title: 'Westpac personal accounts PDS', dom: 'paper', jur: 'private', mb: 0.8, saved: '2012-12-26', note: 'The fine print of an ordinary bank account, filed beside the Banking Act it answers to.' },
    { file: 'QSuper Accumulation Acc PDS.pdf', title: 'QSuper accumulation account PDS', dom: 'paper', jur: 'private', mb: 1.9, saved: '2012-12-27', note: 'A super fund’s fine print, filed beside the acts that shape it.' },
    { file: 'TFN Application Form.pdf', title: 'Tax file number application form', dom: 'paper', jur: 'cth', mb: 0.4, saved: '2012-12-14', note: 'The form that plugs a person into the tax system.' },
    { file: 'Statement by a Supplier Form V2.pdf', title: 'Statement by a supplier form (v2)', dom: 'paper', jur: 'cth', mb: 0.1, saved: '2012-11-19', note: 'The small ATO form that started the whole read: the earliest file in the cabinet.' },
    { file: 'nat3346 Statement by a Supplier.pdf', title: 'Statement by a supplier (NAT 3346)', dom: 'paper', jur: 'cth', mb: 0.1, saved: '2012-11-19', note: 'The same form in its official NAT numbering, saved the same morning.' },
    { file: 'UCC-1 Form.pdf', title: 'UCC-1 financing statement (US form)', dom: 'paper', jur: 'world', mb: 1.1, saved: '2012-12-14', note: 'The American form the opt-out forums swore by. Studying it taught the opposite lesson: there is no out, only through.' }
  ]
};
