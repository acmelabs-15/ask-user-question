# Domain discovery — source coverage

Date: 2026-09-11. Local source commit: d6594010d0ce100df831e5de91ba11c54f5796ce. Skill source version: 0.1.6.

This file records coverage, not successful skill behavior. No revised skill, trigger experiment, or interactive repair test has run.

## Local reading

All files below were read in full, using additional reads after truncated output. Two research agents assisted with the long session ledger and evaluation history; the main agent read the current skill and verified material source claims.

- package.json, README.md, Makefile, .claude-plugin/plugin.json, gemini-extension.json, CHANGELOG.md, and .changeset/README.md.
- skills/ask-user-question/SKILL.md and examples.md.
- All five current references: asking-again.md, failed-question.md, layout.md, reading-answers.md, and wording.md.
- docs/analysis/ANALYSIS-001-plugin-kit-authoring-standards-for-the-ask-user-question-plugin.md.
- docs/analysis/ANALYSIS-002-evidence-rules-from-measured-failures.md.
- docs/analysis/ANALYSIS-003-coverage-check-against-the-retired-asking-users-questions-skill.md.
- docs/analysis/ANALYSIS-004-askuserquestion-tool-capability-audit-at-build-2-1-241.md.
- docs/analysis/ANALYSIS-005-monospace-decision-dialog-layout-rules.md.
- docs/analysis/ANALYSIS-006-surface-portability-of-the-ask-user-question-skill-s-claims.md.
- docs/analysis/ANALYSIS-007-reference-ablation-ground-truth.md.
- docs/sessions/SESSION-2026-08-23_01-ask-user-question-fresh-build.md, all 1,592 lines.
- docs/skills/SKILL-001-orchestrator-process-learnings.md.
- evals/README.md and TRUSTWORTHINESS.md.
- evals/composition/README.md, LINT-RULES-PENDING.md, and judge-rubric.md.
- evals/history/README.md.
- evals/history/skill-snapshot-pre-revision/SKILL.md and its three references: reading-answers.md, register.md, and re-pitch.md.
- evals/history/trigger-2026-08-08_172001/report.md.
- evals/history/composition-2026-08-08_172320/report.md.

The supplied AGENTS.md instructions and Intent domain-discovery skill were read fully. Its deep-read procedure and artifact formats were read before drafting. No repository glossary or repository-local AGENTS.md was found. The research checked selected active harness code to resolve stale documentation; it did not perform a complete source audit of every maintainer utility.

Historical records were read as evidence of earlier work, not used as a current baseline. Later errata and session events take precedence over stale opening summaries for those records.

## User-supplied references

- talk-plain.md at the supplied output-style path: full read.
- domain-modeling.zip: all four content files, 176 lines.
- idea-refine.zip: all five content files, 677 lines.
- interview-me.zip: all fourteen content files, 2,167 lines, including archived logs and envelopes.
- wait-what.zip: both content files, 12 lines.

Exact source paths and archive hashes are in discovery-notes.md. Each context report records file-level coverage. macOS resource-fork metadata was excluded. References to other Brain skills or plugin-root files absent from the archives remain unverified dependencies; their instructions were not executed.

## External evidence

This is targeted supporting research, not a claim to read every publication or an entire external documentation collection. The research questions select material about grounding, repair, partial replies, uncertainty, language, and visual organization. Each report lists the exact source URLs, inspected sections, captures, and applicability limits.

- research-conversation.md: Clark and Brennan (1991), Dingemanse et al. (2015), and Shaikh et al. (2024 version). Verified relevant source passages; the three sources serve different theoretical and empirical roles.
- research-language-layout.md: W3C COGA, GOV.UK good questions/question pages/radios, and Google technical writing. Inspected relevant normative-status and content sections, not unrelated component examples or every linked guide.
- research-evidence-conflicts.md: Amershi et al. (2019) and Lemmer and Corso (2022 version). Verified correction, uncertainty, and limitation passages.
- research-mixed-replies.md: Roberts (2012). Verified partial/complete answers, active questions, nested questions, and theory limitations.
- research-initiative.md: Horvitz (1999) and TRAINS-95 (1996). Verified problem-solving initiative, scoped contributions, and separation of domain analysis from user priorities.
- research-decision-preparation.md: Active Task Disambiguation (2025) and Structured Uncertainty guided Clarification (2026 version). Verified methods and evaluation limits; unsupported autonomous guessing and stopping rules are not adopted.

Paper-index searches and reference expansion came first. Older material absent from the index was located through primary university or publisher sources. Some PDF/viewer captures were unusable; successful alternate source paths and unused captures are recorded in the individual reports. Unread related papers and linked guidance do not count as evidence. No modern coding-agent outcome rate is inferred from these sources.

GitHub was checked through the API: issues enabled, discussions disabled, open issue count zero. A paginated all-state issues request returned no non-PR issues. There were no issue/discussion threads to extract. Release PRs were not used as evidence of communication behavior.

## Draft checks and remaining verification

The domain map passes strict YAML parsing with duplicate-key rejection and structural checks. After the maintainer review, host, and alignment refinements, it contains one domain, one skill, fifteen failure modes, three host subsystems, four tensions, and three remaining verification gaps. Every failure mode carries a wrong/correct illustration. The human-readable specification matches those counts. It is reviewed for tree generation.

Host research uses official docs and pinned source. Claude Code's installed version was checked; Codex protocol types were generated by the installed binary and matched to its release commit; Gemini CLI main and the stated stable sources were compared. host-contracts.md and the three host reports record exact sources, source-level findings, and limits. This is not a live UI audit or an effective-settings audit.

Remaining checks concern live skill selection, target resolution in supplied Brain workflows, actual rendering and delayed responses on the selected host surfaces, and revised behavior. These require later work; the map marks them open. Step 1 is finalized.

Step 2's tree-generator skill was read in full. skill_tree.yaml passes plan-level validation: one mapped skill, one existing skill path, nine distinct supporting paths, three host references, and twenty-three existing source inputs. No replacement SKILL.md or reference has been written, so line counts and runtime behavior of generated content are not yet validation results. The file plan awaits review before Step 3.
