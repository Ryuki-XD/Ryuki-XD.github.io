#!/usr/bin/env python3
"""
Build the CV PDF.

The CV had no source file — only the exported PDF — so this script rebuilds it
from text. Every measurement below (A4, a 51.35pt frame margin, Helvetica at
23/11.8/10.4/9.8/9.6/9.2pt, rules of 0.6pt in #D1D5DB, and the #111827 /
#0F766E / #4B5563 palette) was read back out of the original PDF, so the
output matches the previous export rather than approximating it.

Edit CONTENT below and re-run; keep the CV and the site's project list in step.

    pip install reportlab
    python scripts/build-cv.py

Writes public/cv/Sudip_Kr_Gachhadar_CV.pdf
"""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import BaseDocTemplate, Flowable, Frame, PageTemplate, Paragraph, Spacer

# ---------------------------------------------------------------- palette
INK = HexColor("#111827")      # headings, names — gray-900
TEAL = HexColor("#0F766E")     # accent, links, section headings — teal-700
BODY = HexColor("#4B5563")     # running text — gray-600
RULE = HexColor("#D1D5DB")     # hairlines — gray-300

MARGIN = 51.35
TOP_MARGIN = 42.8
BOTTOM_MARGIN = 40
FRAME_WIDTH = A4[0] - 2 * MARGIN  # 492.57pt

# ----------------------------------------------------------------- styles
name_style = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=23, leading=26, textColor=INK)
title_style = ParagraphStyle("title", fontName="Helvetica", fontSize=11.8, leading=15, textColor=TEAL)
contact_style = ParagraphStyle("contact", fontName="Helvetica", fontSize=9.2, leading=12.4, textColor=BODY)
summary_style = ParagraphStyle(
    "summary", fontName="Helvetica", fontSize=9.8, leading=13.2, textColor=BODY, alignment=TA_JUSTIFY
)
heading_style = ParagraphStyle("heading", fontName="Helvetica-Bold", fontSize=10.4, leading=12.5, textColor=TEAL)
entry_style = ParagraphStyle("entry", fontName="Helvetica", fontSize=9.6, leading=13, textColor=BODY)
sub_style = ParagraphStyle("sub", fontName="Helvetica-Oblique", fontSize=9.6, leading=12.6, textColor=BODY)
bullet_style = ParagraphStyle(
    "bullet",
    fontName="Helvetica",
    fontSize=9.6,
    leading=13,
    textColor=BODY,
    alignment=TA_JUSTIFY,
    leftIndent=12,
    bulletIndent=1,
    bulletFontName="ZapfDingbats",
    bulletFontSize=5,
    spaceBefore=1.0,
)

# ReportLab remaps bullet and symbol characters rather than passing them through,
# so both of these are the input that yields the glyph the original PDF used:
# U+25CF -> ZapfDingbats 'l' (filled circle), &rarr; -> Symbol ® (right arrow).
# Passing 'l' or U+2022 instead silently yields ZapfDingbats 'n', a square.
DOT = "●"
ARROW = "&rarr;"


def b(text: str) -> str:
    """Bold, in the heading ink — used for role and project names."""
    return f'<font color="#111827"><b>{text}</b></font>'


def link(text: str) -> str:
    return f'<font color="#0F766E">{text}</font>'


class Rule(Flowable):
    """The 0.6pt hairline under each section heading."""

    def __init__(self, width: float, space_before: float = 2.6, space_after: float = 5.0):
        super().__init__()
        self.width = width
        self.space_before = space_before
        self.space_after = space_after
        self.height = space_before + space_after

    def draw(self):
        self.canv.setStrokeColor(RULE)
        self.canv.setLineWidth(0.6)
        self.canv.line(0, self.space_after, self.width, self.space_after)


# ---------------------------------------------------------------- content
NAME = "Sudip Kr. Gachhadar"
TITLE = "Software Developer&nbsp; |&nbsp; Web &amp; App Development"

CONTACT = (
    f'Biratnagar, Nepal&nbsp; ·&nbsp; +977 9844037873&nbsp; ·&nbsp; {link("kaixhero@gmail.com")}<br/>'
    f'{link("ryuki-xd.github.io")}&nbsp; ·&nbsp; {link("github.com/Ryuki-XD")}'
    f'&nbsp; ·&nbsp; {link("linkedin.com/in/sudip-gachchhadar-802812398")}'
)

SUMMARY = (
    "BSc (Hons) Computer Systems Engineering (IT) student who builds complete, working products end to end "
    "— database-backed web apps, cross-platform mobile apps, desktop tools, and browser games. Recently "
    "shipped a two-app Flutter and Firebase delivery platform to Google Play as part of a small team. "
    "Looking for a first full-time developer role."
)

EDUCATION = [
    (
        f'{b("BSc (Hons) Computer Systems Engineering (IT)")}&nbsp; — &nbsp;2023 – 2026',
        "ISMT College, Biratnagar&nbsp; ·&nbsp; University of Sunderland, UK&nbsp; ·&nbsp; Status: Awaiting Graduation",
    ),
    (f'{b("+2 Computer Science")}&nbsp; — &nbsp;Shikshadeep B.S.S&nbsp; ·&nbsp; 2021 – 2023', None),
]

EXPERIENCE_HEAD = f'{b("Flutter Developer")}&nbsp; — &nbsp;ByteCrew&nbsp; ·&nbsp; 2026'
EXPERIENCE_SUB = "Shiv Ganga — Water Delivery&nbsp; ·&nbsp; client project, shipped to Google Play Early Access"
EXPERIENCE_BULLETS = [
    "Worked across both apps in a small team: a customer ordering app with catalogue, cart, checkout and "
    "order history, and a delivery partner panel, sharing one Firebase backend.",
    "Cloud Firestore order data streaming live to drivers, scoped per partner, with a confirmed "
    f"{ARROW} out for delivery {ARROW} delivered workflow.",
    "Firebase Auth with Google sign-in, Cloud Messaging push notifications, and Firebase App Check; "
    "bilingual Hindi/English interface.",
]

PROJECTS = [
    f'{b("The Aurelian Kathmandu")} — full-stack hotel reservation platform in Next.js and TypeScript; a booking '
    "engine enforcing a 100-guest occupancy limit inside a database transaction, a role-based admin dashboard, "
    f'and an AI concierge grounded in the hotel’s own data. {link("ryuki-xd.github.io/the-aurelian-kathmandu")}',
    f'{b("Delivery Panel Starter")} — open-source Flutter + Firebase template for driver panel apps; layered so '
    f'widgets never touch Firestore. MIT licensed. {link("github.com/Ryuki-XD/flutter-delivery-panel-template")}',
    f'{b("AI Solutions Website")} — full-stack business site with a CMS-style admin dashboard, a Google Gemini '
    "chatbot, and email automation over a Python REST API backed by MongoDB.",
    f'{b("Athena Library Management System")} — JavaFX desktop app over MySQL built to MVC with a DAO layer; '
    "hashed logins, overdue fine calculation, and dashboard reports.",
    f'{b("Inventory Management System")} — Python and SQLite desktop app with dashboard KPIs, barcode '
    "generation, PDF invoices, Excel/CSV export, and database backups.",
    f'{b("Chrono Architect")} and {b("Cyber Heist")} — browser games on Phaser 3 with all graphics and audio '
    "generated in code. Both playable in the browser.",
    f'{b("AI Resume Analyzer")} — Streamlit ATS scorer using TF-IDF and cosine similarity for keyword coverage '
    "and skill-gap analysis.",
]

SKILLS = [
    ("Languages:", "Java, Python, JavaScript, TypeScript, Dart, PHP, SQL"),
    ("Mobile:", "Flutter, Firebase Auth, Cloud Firestore, Cloud Messaging"),
    ("Web:", "HTML, CSS, React, Next.js, Tailwind CSS, Node.js, REST APIs"),
    ("Databases:", "MySQL, PostgreSQL, MongoDB, SQLite, Prisma"),
    ("Tools &amp; practices:", "Git &amp; GitHub, Maven, VS Code, MVC / layered architecture, CRUD &amp; auth"),
]


def build(out_path: Path) -> None:
    doc = BaseDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=TOP_MARGIN,
        bottomMargin=BOTTOM_MARGIN,
        title=f"{NAME} - CV",  # ASCII hyphen: ReportLab writes docinfo in latin-1
        author=NAME,
        subject="Curriculum Vitae",
    )
    frame = Frame(MARGIN, BOTTOM_MARGIN, FRAME_WIDTH, A4[1] - TOP_MARGIN - BOTTOM_MARGIN, id="body", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="cv", frames=[frame])])

    story: list = [
        Paragraph(NAME, name_style),
        Spacer(1, 2.5),
        Paragraph(TITLE, title_style),
        Spacer(1, 3.5),
        Paragraph(CONTACT, contact_style),
        Rule(FRAME_WIDTH, space_before=4.5, space_after=5.5),
        Paragraph(SUMMARY, summary_style),
        Spacer(1, 7),
    ]

    def section(label: str):
        story.append(Paragraph(label, heading_style))
        story.append(Rule(FRAME_WIDTH))

    section("EDUCATION")
    for head, sub in EDUCATION:
        story.append(Paragraph(head, entry_style))
        if sub:
            story.append(Paragraph(sub, sub_style))
        story.append(Spacer(1, 4))
    story.append(Spacer(1, 2))

    section("EXPERIENCE")
    story.append(Paragraph(EXPERIENCE_HEAD, entry_style))
    story.append(Paragraph(EXPERIENCE_SUB, sub_style))
    story.append(Spacer(1, 2))
    for item in EXPERIENCE_BULLETS:
        story.append(Paragraph(item, bullet_style, bulletText=DOT))
    story.append(Spacer(1, 7))

    section("SELECTED PROJECTS")
    for item in PROJECTS:
        story.append(Paragraph(item, bullet_style, bulletText=DOT))
    story.append(Spacer(1, 7))

    section("TECHNICAL SKILLS")
    for label, value in SKILLS:
        story.append(Paragraph(f"{b(label)} {value}", entry_style))

    doc.build(story)


if __name__ == "__main__":
    target = Path(__file__).resolve().parent.parent / "public" / "cv" / "Sudip_Kr_Gachhadar_CV.pdf"
    target.parent.mkdir(parents=True, exist_ok=True)
    build(target)
    print(f"Wrote {target} ({target.stat().st_size:,} bytes)")
