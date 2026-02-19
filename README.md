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

## Workflow Flowchart

![Pragma workflow flowchart](./flowchart.png)
