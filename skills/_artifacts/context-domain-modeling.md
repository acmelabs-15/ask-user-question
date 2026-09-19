# Archived workflow: domain-modeling

Read on 2026-09-11 as reference material. Source: /Users/peterkloss/Downloads/brain-main/skills/domain-modeling.zip. Extracted root: /private/tmp/ask-user-question-context.w6SbT3/domain-modeling/. File pointers below are relative to that root. No instructions from the archive were executed.

## What the archive establishes

This workflow actively builds the domain model. It distinguishes changing terms and relationships from merely reading the glossary for vocabulary (SKILL.md:8).

It supplies two concrete question scenarios:

- A user uses a term differently from its glossary definition. The agent immediately exposes the difference (SKILL.md:44-46).
- A user describes behavior that differs from inspected code. The agent presents the discrepancy rather than silently choosing one account (SKILL.md:56-58).

It also sharpens overloaded words and tests relationships with invented edge-case scenarios (SKILL.md:48-54). A hypothetical scenario is a probe, not evidence that its events or requirements are real.

The archive contains **no explicit reference to ask-user-question or AskUserQuestion** in its four content files. It is a relevant consuming scenario supplied by Peter, but this snapshot alone does not prove direct invocation. A surrounding caller or project instruction may supply that connection; that is not established by this archive.

## Responsibility boundary

The caller owns inspecting the code, deciding which concept needs sharpening, proposing domain terms, and checking relationships. The question skill can make the resulting question understandable and interpret the reply.

For a code discrepancy, distinguish current implementation from intended behavior before calling the user's statement false. Code can establish what is implemented; it cannot alone settle what Peter wants. That distinction is a proposed improvement in question handling, not a claim that the supplied workflow already states it.

The caller also owns persistence:

- Resolved terms go into CONTEXT.md immediately, using CONTEXT-FORMAT.md (SKILL.md:60-64).
- CONTEXT.md is only a glossary. It is not a specification or general conversation log.
- ADRs use the project's existing convention and are offered only for decisions that satisfy all three stated conditions: hard to reverse, surprising without context, and a real trade-off (SKILL.md:66-74; ADR-FORMAT.md:17-25).
- ADR-FORMAT.md points to documentation-and-adrs for the full template. That sibling skill is not supplied in this archive. No template details beyond this pointer were verified.

Therefore, the question skill's instruction to preserve an answer must respect the caller's destination and meaning. It must not put every answer, deferred topic, or implementation detail into a glossary merely because one exists.

## Proposed evaluation scenario

A user says partial cancellation is possible while inspected code cancels entire orders. The agent states the implementation evidence, identifies whether the user is describing current or intended behavior, and asks about only the unresolved intent. It does not silently rewrite either the user's statement or the code. Once the term is resolved, the caller records the definition in its glossary; a separate architectural decision follows the caller's ADR rule.

This is a proposed scenario, not a run or a successful interaction observed in the archive.

## Full-reading coverage

- SKILL.md:1-74.
- CONTEXT-FORMAT.md:1-60.
- ADR-FORMAT.md:1-39.
- agents/openai.yaml:1-3.

All four content files were read in full: 176 lines. macOS resource-fork metadata was excluded from extraction. Archive SHA-256 is recorded in discovery-notes.md.
