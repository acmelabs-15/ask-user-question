# Research: language and visual organization in question dialogs

Research date: 2026-09-11. Intermediate evidence for Intent domain discovery; this does not change the skill or settle its architecture.

## Finding

Official guidance supports Peter's requested direction: familiar consistent words, focused text blocks, clear purpose, visible grouping, and explanations beside choices. It also supports changing a confusing question's structure or answer labels, rather than merely shortening its text. These are candidate practices for an agent dialog. The sources do not prove that a particular dialog template, fixed word limit, or recommendation order works best in programming conversations.

## Verified sources

### L1. W3C: Making Content Usable for People with Cognitive and Learning Disabilities

- URL: https://www.w3.org/TR/coga-usable/
- Date: Working Group Note, 29 April 2021; current published URL retrieved 2026-09-11.
- Type: official, non-normative accessibility guidance. The document explicitly says these patterns supplement WCAG and are not required for WCAG conformance. This is not a normative accessibility standard or a controlled study of agent dialogs.
- Capture: `.firecrawl/language-w3c-coga.md`.
- Verified sections: 4.3.3, 4.3.4, 4.4 introduction, 4.4.1, 4.4.5, 4.4.6, 4.4.9, 4.4.10, 4.4.12, 4.8.3, and publication status.

Supported findings: organize related content into clear regions; use visual cues that explain structure without clutter; make important information easy to find. Use familiar words and explain necessary unfamiliar terms. Keep each paragraph on one topic and each sentence on one point; put the purpose early. Short headings, lists, and space can expose relationships. Explain choice benefits, risks, and consequences where users make the choice.

Applicability: these principles map to question content and the organization available in a dialog. They do not authorize changes to the host UI. Applicability to a programmer's conversation is an adaptation, not a measured outcome. The guide includes numerical heuristics, such as reconsidering English paragraphs over 50 words, but also says to test whether a longer sentence is clearer. Do not turn those heuristics into universal pass/fail limits.

### L2. GOV.UK Service Manual: Designing good questions

- URL: https://www.gov.uk/service-manual/design/designing-good-questions
- Dates: published 22 June 2018; updated 24 June 2026; retrieved 2026-09-11.
- Type: official service-design guidance, including a reported government-service user-research example. The page does not provide a full experimental protocol or quantified effects.
- Capture: `.firecrawl/language-govuk-good-questions.md`.

Supported findings: simple questions in sequence can be easier than a complex question. If users struggle, revise framing or form structure as well as language. Descriptive answers can resolve ambiguity that a yes/no choice hides. The register-to-vote example reports that people did not know what qualified as a second address; more concrete answer labels helped. Necessary help can explain consequences and should appear near the relevant question or option.

Applicability: useful for distinguishing a missing definition, vague answer label, and conflated question. The preference for closed questions is explicitly discussed in the government-service context; open discovery questions may still be necessary here. The page's three-line help-text claim is not a universal chat limit and is not adopted.

### L3. GOV.UK Design System: Question pages

- URL: https://design-system.service.gov.uk/patterns/question-pages/
- Date: publication/update date not established from the captured page; retrieved 2026-09-11.
- Type: official web-service design pattern.
- Capture: `.firecrawl/language-govuk-question-pages.md`; inspected the question purpose and reuse guidance.

Supported findings: ask for information that is needed, make the reason for asking clear, support uncertainty where valid, and reuse information already supplied.

Applicability: the agent can state the current decision and why it matters, and avoid asking the user to repeat settled facts. Web controls such as back links and continue buttons are host concerns and do not become skill requirements.

### L4. GOV.UK Design System: Radios

- URL: https://design-system.service.gov.uk/components/radios/
- Date: publication/update date not established from the captured page; retrieved 2026-09-11.
- Type: official web-component guidance.
- Capture: `.firecrawl/language-govuk-radios.md`; inspected choice cardinality, default selection, ordering, and option hints.

Supported findings: use a single-choice control when one answer is allowed, explain selection cardinality if necessary, and include an uncertainty/none answer when valid. Option hints can add explanatory information. Preselection risks missed questions or incorrect submissions. Ordering can introduce bias; this guide uses alphabetical order as its default.

Applicability: ensure the question and permitted answer mode agree. A recommendation label is not a selected answer or user consent. Alphabetical order is not automatically appropriate for an advisory technical dialog; Peter's requested recommendation is a product preference, not something established by this source. The component's short-hint and punctuation rules depend on its screen-reader behavior and should not be copied as universal dialog syntax.

### L5. Google Technical Writing One: Words

- URL: https://developers.google.com/tech-writing/one/words
- Date: last updated 28 March 2025; retrieved 2026-09-11.
- Type: official technical-writing educational guidance, not an empirical paper.
- Capture: `.firecrawl/language-google-words.md`; inspected terminology, acronyms, and ambiguous pronouns.

Supported findings: explain terms unfamiliar to the audience, use a consistent unambiguous name for each concept, and prefer explicit nouns where pronouns create ambiguity. A short acronym can add mental work if the reader must repeatedly expand it.

Applicability: retain established project and community terminology instead of replacing it with invented synonyms or compressed labels. Explain only what this reader needs; a familiar technical term can be clearer than a vague everyday substitute. The exact precedence of project glossary, user vocabulary, and community vocabulary remains a local policy, not a ranking proven by this source.

## Candidate checks for later skill design

These are synthesis, not quotations or already approved requirements.

1. **Purpose:** From the dialog alone, can the reader identify the current subject, the needed decision, and why answering matters? Basis: L1, L3; keeping context inside the call is Peter's explicit requirement.
2. **Scope:** Does one answer resolve one stated question? If parts need independent answers, can they be asked in sequence? Basis: L2; one question at a time is Peter's explicit preference.
3. **Terms:** Do the same words retain the same meanings across context, question, and options? Is each necessary unfamiliar term explained before it is needed? Basis: L1, L5.
4. **Organization:** Does each paragraph have one purpose? Do lists or headings reveal real groups? Is the decision visible without reading unrelated detail? Basis: L1. Evaluate the rendered dialog; do not infer visual readability from character count.
5. **Options:** Can the reader distinguish the actual outcomes of the choices? Are relevant costs or consequences present beside the choices? Does the input mode match whether answers can coexist? Basis: L1, L2, L4.
6. **Recommendation:** Is the agent's recommendation recognizable as advice, with a stated reason, while every available choice remains understandable? The recommendation requirement comes from Peter; L1 supports explaining effects and L4 cautions about defaults and bias.
7. **Repair:** When the reader is confused, identify whether the problem is a term, omitted context, vague answer, or combined scope. Change that part, preserving settled information. Basis: L2, L3; this diagnostic list is our adaptation and should be evaluated.

## Coverage and limits

This pass covers terminology, paragraph focus, structure, question scope, option clarity, effects of choices, and revision after confusion. It does not establish a complete response-handling state machine, ideal option count, fixed layout template, optimal conversation length, or causal improvement in project outcomes. No original empirical study was retrieved in this pass. The reported GOV.UK research example illustrates a specific repair; it is not general quantitative evidence.

The next validation should use actual question calls and representative replies: can Peter understand the intended choice, can the agent correctly identify what the answer settles, and does a repair resolve the specific confusion? Keep user preference, official guidance, our inference, and observed evaluation results separate in any final specification.
