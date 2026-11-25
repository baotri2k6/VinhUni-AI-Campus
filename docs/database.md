# Database design

v0.1.0 installs the `vector` extension during first-time PostgreSQL initialization. Domain tables and Alembic revisions are planned for Phase 3. Redis is an ephemeral dependency for future caching and background work.

## Planned relational model

| Domain | Tables and relationships |
| --- | --- |
| Identity | `users`, `roles`, `user_roles`, `students`, `lecturers`. Student and lecturer profiles reference unique user IDs. |
| Organization | `faculties` own `departments`, which own versioned `programs` and `courses`. `program_requirements` binds a program version to courses. |
| Curriculum | `course_prerequisites` links courses with a unique pair and forbids self-links. Domain validation rejects cycles. |
| Scheduling | `terms` contain `sections` for courses. `section_meetings` reference sections and rooms. Instructor assignments reference lecturers. |
| Enrollment | `enrollments` is unique per student and section. Transactional capacity checks serialize against the same section row. `grades` references an enrollment. |
| Finance | `tuition_invoices` reference student and term. `payments` use a unique transaction reference. |
| Communications | `announcements`, targeted `notifications` and `support_tickets` represent campus notices, individual delivery and support work. |
| AI | `documents`, `document_chunks`, `student_memories` and `agent_runs` store provenance, retrieval content, opt-in memory and execution metadata. |
| Audit | `audit_events` records actor, action, entity, outcome, time and correlation ID. Limit write and read privileges to designated roles. |

Use foreign keys, unique indexes and explicit delete policies. Store money as fixed-precision decimals and timestamps with timezone. GPA is derived from credited attempts under a versioned academic policy. Preserve grade-change history. Student queries resolve ownership from authenticated identity, including when an agent asks for data. Index ownership and term columns for scoped reads. Consider PostgreSQL row-level security as a second layer with explicit policy tests.

Document chunks retain source, version, access scope and embedding model metadata. Select vector dimensions and an index only after the embedding model and retrieval benchmarks are established. Keep production DB credentials away from migration and agent processes, and review retention and redaction before storing identifiable data.
