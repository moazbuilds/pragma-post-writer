<p align="center">
  <img src="./banner.png" alt="Pragma Banner" width="600">
</p>

<p align="center"><strong>Pragma is a modular AI skill and workflow that turns raw notes into publish-ready posts for social media, blogs, and forums ✍️</strong></p>

## Installation

### NPX Skills

```bash
npx skills add https://github.com/moazbuilds/pragma-post-writer
```

Then use it inside Claude Code, OpenClaw, or any CLI tool or IDE that accepts skills, by running `/pragma-post-writer` and following the workflow.

### CodeMachine CLI (Recommended)

Make sure you have CodeMachine CLI installed.

```bash
codemachine import moazbuilds/pragma-post-writer
```

Then choose it from `/templates` and run it with `/start`.

The default engine is Claude. Make sure it's authenticated using `/login` before you run `/start`.

## Why Pragma?

**Most AI post-writing services behave like rephrasers.**  
They take your draft, smooth the wording, and give it back. It may read better, but it often misses your true intent, your real voice, and the influence structure behind strong writing.

**Pragma is built differently.**

It does not begin with sentence polishing. It begins with clarity: what you actually want to say, who it is for, why it matters, and what proof supports it. Then it builds the post step by step, so the thinking gets stronger before the wording gets prettier.

> **Pragma is not just a tool that writes for you.**  
> It is a workflow that helps you think, structure, and communicate like yourself with strategic depth.

## Pragma vs Typical AI Post Writers

**Typical AI post writer:**  
- wording gets cleaner  
- tone gets more generic  
- structure stays mostly the same  
- weak thinking stays weak

**Pragma:**  
- clarifies the core idea  
- defines the reader-first angle  
- asks for real proof (story, stat, example)  
- builds hook, body, ending, and CTA in sequence  
- after writing, it lets you humanize the draft to remove AI tone and make it sound like your own voice

## Personas and Signature Faces

### Ink 🖋️ (Expert Track Persona)

- **Role:** Step-by-step post writing coach focused on clarity, structure, and quality.
- **Default face:** `✒(●‿●)✒`
- **Psychology:** Ink is designed to reduce cognitive overload by slowing the user into a structured sequence. The calm mentor identity increases trust, improves reflection quality, and helps users stay in strategy mode before sentence-level polishing.

### Flash 💥 (Quick Track Persona)

- **Role:** Speed-run writer that gathers context quickly and delivers the full post in one pass.
- **Default face:** `≡(💥▽💥)≡`
- **Psychology:** Flash is built for momentum and rapid execution. The high-energy identity reduces hesitation, shortens decision loops, and helps users move from idea to publishable output without overthinking.

## Workflow Flowchart

![Pragma workflow flowchart](./flowchart.png)

## Full Workflow Steps and Questions

### Track 1: Flash (Quick) - 1 Step

**Step 1: Full Post**  
**Objective:** Gather essential context quickly, then deliver a full post (hook, body, ending, CTA) with humanization in one run.

**Questions asked (intake is dynamic, one-question-at-a-time):**
- What do you want to write about?
- Can you text this core idea in one sentence so a friend gets it?
- After reading this, you want the reader to ___?
- Do you have a specific story, number, or real example?
- Who exactly is this for (one person, one situation)?
- Soft checkpoint question: What would you like to do? (share more / move on)
- Hard-exit question: Is there anything critical I might be missing?

### Track 2: Ink (Expert) - 5 Steps

**Step 1: Pre-Writing**  
**Objective:** Validate core idea, reader-first angle, proof, structure, and target reader before drafting.  
**Questions asked:**
- What do you want to write about?
- After reading this, you want the reader to ___?
- Do you have a specific story, number, or real example to back this up?
- Who specifically are you writing this for? Give me a name and a situation.
- If a complete stranger wrote this exact post, would you stop scrolling for it?
- Soft checkpoint question: What would you like to do? (share more / move on)
- Hard-exit question: Is there anything critical I might be missing?

**Step 2: Hook**  
**Objective:** Choose and refine a hook that creates a strong curiosity gap.  
**Questions asked:**
- Which hook type feels right for your post?
- Which one grabs you? Or want me to try a different angle?
- If you showed just these 2-3 lines to someone, would they say "...and then what?" or would they shrug?

**Step 3: Body**  
**Objective:** Build the main draft with concrete proof, structure, and readable flow.  
**Questions asked:**
- Before I draft the body, is there anything else you want to include? A specific story detail, a number, a quote?
- Does this capture what you wanted to say? What would you add, remove, or change?

**Step 4: Ending**  
**Objective:** Land the post with the right kicker and goal-aligned CTA.  
**Questions asked:**
- Which kicker type feels right? Or should I pick the best fit?
- Which ending resonates? Or want me to adjust?
- Which CTA connects best to your goal?

**Step 5: Edit & Polish**  
**Objective:** Remove AI tone, add human texture, and finalize publish-ready voice.  
**Questions asked:**
- Does this feel cleaner? Anything I cut that you want back?
- Read this out loud. Does it sound like something you'd actually say? Or does any part still feel robotic?
- Read-aloud test: flag any sentence where you stumble or where it sounds like a textbook instead of a person talking.

## Technical Design

- **Two execution tracks**
  - `Flash`: one-step writing with full-context intake.
  - `Ink`: a 5-step guided flow (`Pre-Writing -> Hook -> Body -> Ending -> Edit & Polish`).

- **Step-gated orchestration**
  - Each step has one objective and one responsibility.
  - Steps do not self-advance.
  - Progression is controlled by the workflow system/user action, which prevents premature jumps.

- **Structured generation instead of one-shot drafting**
  - Each phase validates specific artifacts (angle, proof, hook, CTA, tone).
  - Later phases build on earlier outputs.
  - This reduces drift, generic writing, and weak post logic.

- **Humanization at the end**
  - Structure and persuasion are solved first.
  - AI tone cleanup is applied last so voice improves without breaking message strategy.

- **Modular prompt architecture**
  - Shared system rules + route-specific prompts.
  - Router selects `Flash` or `Ink`.
  - Keeps behavior consistent and easy to maintain.
