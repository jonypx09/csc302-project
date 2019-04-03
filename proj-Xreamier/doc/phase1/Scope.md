# XReamier - Scope
---

During our meetings we realized that the individual members of our group may have greatly varied learning interests. So we opted to list down our personal learning goals.

- Matthew: Django/Flask
    - Matthew wishes to implement some backends using Django/Flask. It's a technology that he is interested in learning.
- Pat: React/Flask
    - Pat wishes to reinforce his React understanding, as well as try out some Flask along the way.
- Nick - Flask
    - Nick wants to learn flask, a technology that he hasn't used before but thinks is exciting.
- Jonathan: React/Flask
    - Jonathan wants to polish his skills in React, as well as learn some Flask.
- Daniel: Docker
    - Daniel is weird, he wants to do docker for some reason. He's had some experience before, but wants to build something bigger and better this time.
- Ray: ORM
    - Ray doesn't really know much web-development so he settled for Object Relational Models, which is like SQL queries encapsulated in objects. He's never heard of it before but thinks it might be useful.

The majority of us wish to learn backend frameworks and the rest wish to learn technologies that compliment backend development. Because of this we decided that we wanted to build the systems that would facilitate ticket creation,  assignment, and management before anything else. As our project is more backend than front end, we will be putting an emphasis on functionality over presentation.

**Our project goal is to create an application that greatly aids the management of tickets.**

---

**Use Cases**

The following are the use cases that we consider vital to our project goal, and will be focused on before any other use cases.

**Budget Director**
- Add note, edit/delete own notes, view/resolve all notes on ticket.
- Create 1 to N domestic or international tickets for faculty member in “initial” state
- Mark ticket as “granted”. Faculty notified.

**Faculty/FSS**
- Add note, edit/delete own notes, view/resolve all notes on ticket.
- Get Ticket Status updates via email for Ticket state:
    - Offer-granted
    - Offer-request
    - Offer-pending
    - Offer-refused
    - Offer-accepted (spent)
- View own tickets
- Filter/Sort by domestic/international, state
- Authorize offer with ticket. Faculty associates a ticket with an applicant. Set state of ticket to “offer-request” and set up association between ticket and candidate by entering candidate name and ID into ticket.

**Associate Chair graduate**
- Add note, edit/delete own notes, view/resolve all notes on ticket.
- In consultation with the Admissions Chair, approve an offer by transitioning ticket state from offer-request state to offer-pending.
- Only one ticket is used to authorize offer to an applicant;
in cases where an applicant has multiple interested faculty, as frequently occurs with strong domestic applicants, the Associate Chair negotiates with faculty to determine whose ticket will be associated with a given offer. NB All interested parties are will eventually identified as interested supervisors on the Letter of offer equally (i.e. the applicant does not know who “offer-authorized” the ticket as opposed to which faculty are “named” on the offer letter).  Hint that multiple faculty may be associated with a given ticket and offer. (Eventually when candidate becomes a student they choose their supervisor themselves, presumably from the profs who were willing to fund them.)

**Grad office staff**
- Add note, edit/delete own notes, view/resolve all notes on ticket.
- View ticket dashboard. See all tickets, filtered and sorted appropriately.
- Edit ticket state
    - That have been given the green light by the Associate Chair, a.k.a. “Offer-request to     offer-pending
    - That have been accepted or rejected by the applicant, a.k.a “Offer accepted/rejected”

In general the usecases we have chosen deal directly with tickets. Other use cases such as export GAPF, we consider extraneous and have been omitted from our scope.
