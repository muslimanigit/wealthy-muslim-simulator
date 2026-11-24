# THE WEALTHY MUSLIM

## Product Requirements Document (PRD)

**Product:** The Wealthy Muslim — Islamic Wealth & Impact Simulator  
**Status:** Ready for implementation  
**Implementation environment:** Existing locally cloned project  
**Primary design reference:** Interactive spending simulator patterns  
**Product concept:** An interactive simulator that lets users explore how much good they could potentially accomplish with different amounts of wealth.

---

# 1. Product Vision

Transform the existing locally cloned application into an engaging Islamic wealth and impact simulator.

The experience should follow the simplicity and interaction model of a minimal spending simulator.

Instead of buying luxury products, users spend hypothetical wealth on initiatives that support:

- Dawah and spreading authentic Islamic knowledge.
- Islamic education and knowledge infrastructure.
- Supporting new Muslims.
- Quran distribution and Islamic literature.
- Humanitarian and charitable initiatives.
- Water, food, healthcare, and poverty relief.
- Supporting vulnerable communities.
- Waqf and long-term charitable projects.
- Initiatives that can benefit future generations.

Users should be able to select their starting wealth, browse visual project cards, buy initiatives, sell previously allocated projects, change quantities, customize project prices, and watch their remaining balance update immediately.

The application is educational and inspirational. It does not process real donations or payments.

**Core philosophy:**

"What if we measured wealth not only by what we could buy for ourselves, but also by how much good we could bring into the world?"

# 2. Design Direction: Interactive Spending Simulator

The primary design and interaction reference is a minimal interactive spending simulator with immediate balance feedback, browsable item cards, and simple buy/sell controls.

The goal is to recreate the simplicity, engagement, and spending experience of this interaction model, adapted to Islamic charity and impact.

Do not use the original GitHub project's interface as the design direction. The existing local codebase is simply the implementation workspace. Its current UI can be replaced where necessary.

## 2.1 Core experience

The application should open directly into the simulator.

Do not create a conventional charity website homepage with multiple informational sections, marketing content, or complicated navigation.

The user should immediately see:

1. The amount of wealth available.
2. How much has been spent.
3. How much remains.
4. The available initiatives.
5. The controls for allocating wealth.

The experience should be immediately understandable without onboarding.

## 2.2 Main layout

Use a clean, centered simulator layout.

**Top section: Wealth summary**

Display a prominent remaining balance.

Example:

**$100,000,000 left**

Below it, show:

- Starting wealth.
- Total spent.
- Percentage spent.
- A visual progress indicator.

The balance should update immediately whenever the user buys or sells an initiative.

Make the remaining balance visually prominent throughout the experience. On desktop, keep it visible while users browse the catalog where practical.

**Main section: Project catalog**

Display a visually engaging collection of project cards.

Each card should include:

- Project image or meaningful illustration.
- Project name.
- Estimated price.
- Buy button.
- Sell button.
- Current quantity purchased.
- Quantity multipliers.
- Editable price control.

The layout should feel like browsing and purchasing items in a spending simulator, not filling out a donation form.

## 2.3 Project cards

Each project should have a consistent visual card.

Example:

**Build a Water Well**

<Illustrative image of a community water well>

$1,500

[ Sell ] 0 [ Buy ]

[ ×10 ] [ ×100 ] [ ×1,000 ]

The quantity controls should make it possible to purchase many units quickly.

For example, if a user has $10 million and a water well costs $1,500, they should be able to purchase hundreds or thousands of wells without repeatedly clicking Buy.

Use appropriate controls and visual feedback to make this experience intuitive.

## 2.4 Buy and Sell behavior

Every project must support both actions.

**Buy:**

- Increase the purchased quantity.
- Deduct the corresponding amount from the remaining balance.
- Update the total spent.
- Update the progress indicator.
- Update the project's displayed quantity.

**Sell:**

- Decrease the purchased quantity.
- Return the corresponding amount to the remaining balance.
- Update all dependent calculations.

Users must never be able to purchase more than their available balance allows.

Selling must never produce a negative quantity.

## 2.5 Bulk purchasing

Support convenient quantity multipliers:

- ×1
- ×10
- ×100
- ×1,000

The multipliers should work with both Buy and Sell.

Where appropriate, support a custom quantity input.

If the user cannot afford the full requested quantity, prevent overspending and provide clear feedback. Do not silently purchase an unexpected quantity.

## 2.6 Visual inspiration

Use the reference simulator's simplicity:

- Strong numerical hierarchy.
- Minimal visual clutter.
- Clear project prices.
- Easily recognizable project images.
- Prominent Buy and Sell buttons.
- Immediate numerical feedback.
- Smooth and subtle interaction feedback.
- A straightforward browsing experience.

Do not reproduce any existing simulator's exact assets, branding, text, or copyrighted visual materials. Create an original Islamic impact visual identity using the same broad interaction principles.

# 3. Starting Wealth

Users must be able to choose their starting wealth.

The application must not be restricted to one amount.

Provide presets:

| Preset             | Starting wealth |
| ------------------ | --------------: |
| Small contribution |            $100 |
| Personal savings   |          $1,000 |
| Modest budget      |         $10,000 |
| Significant budget |        $100,000 |
| Millionaire        |      $1,000,000 |
| Multi-millionaire  |     $10,000,000 |
| Ultra-high wealth  |    $100,000,000 |
| Billionaire        |  $1,000,000,000 |
| Custom             |    User-defined |

Default starting wealth: $100,000.

Allow the user to enter any custom amount.

The wealth selector can be displayed above the simulator or through a simple settings control. Do not make it an unnecessarily complicated onboarding process.

## 3.1 Changing starting wealth

Users should be able to change their starting wealth at any time.

When the starting amount changes:

- Recalculate the remaining balance.
- Preserve purchased quantities where possible.
- Recalculate total spent.
- Identify any resulting budget overflow.
- Never silently remove purchased items.

Provide a clear reset option.

# 4. Editable Project Prices and Local Customization

**This is a critical requirement.**

Every project must have an editable estimated price.

Initial project prices are illustrative defaults, not universal prices.

For example, a person living in Africa might know that building a water well in their region costs $800 rather than the default estimate of $1,500.

They should be able to change the price to $800 and immediately see how many wells their hypothetical wealth could fund.

This must work for every project.

## 4.1 Editing prices

Allow users to edit prices directly from the project card.

The editing experience should be simple:

- Click or tap the displayed price or edit control.
- Enter a new amount.
- Confirm the change.
- Immediately update the calculations.

Show the default price and customized price clearly when they differ.

Provide a reset-to-default action.

## 4.2 Local pricing examples

Illustrative examples:

| Initiative                   | Default estimate | Customized estimate |
| ---------------------------- | ---------------: | ------------------: |
| Water well                   |           $1,500 |                $800 |
| Quran copy                   |               $5 |                  $3 |
| Meal                         |               $3 |                  $2 |
| Orphan sponsorship/year      |             $600 |                $300 |
| Educational scholarship/year |           $5,000 |              $2,500 |

These figures are only starting assumptions for the simulator. They must not be represented as verified market prices.

The application must never assume that a project costs the same everywhere.

## 4.3 Currency

Support:

- USD.
- EUR.
- GBP.

Allow users to customize prices independently of currency conversion.

Changing currency must not accidentally overwrite their custom project prices.

## 4.4 Persistence

Save customized prices locally using localStorage.

Preserve them when the page is refreshed.

Provide controls to:

- Reset an individual project price.
- Reset all customized prices.
- Reset the entire simulation.

# 5. Dawah: The Most Important Category

Dawah should receive exceptional prominence.

It should be one of the first categories users see and a major part of the project catalog.

The objective is to help users discover how much they could potentially accomplish by supporting Islamic knowledge, education, translation, and Dawah infrastructure.

The application must include all 205 opportunities below.

## 5.1 Digital Dawah and Online Content

1. Islamic YouTube channels.
2. Short-form Islamic content (TikTok, Instagram Reels, YouTube Shorts).
3. Islamic documentaries.
4. Dawah podcasts.
5. Islamic animation.
6. Islamic children's cartoons.
7. Islamic social media pages.
8. Islamic educational websites.
9. Islamic newsletters.
10. Islamic mobile applications.
11. Search engine optimization for Islamic resources.
12. Online advertising for Islamic educational content.
13. Islamic video courses.
14. Islamic audiobooks.
15. Islamic livestreams.
16. Islamic infographics.
17. Islamic email courses.
18. Islamic content archives.
19. Dawah content repurposing and distribution.
20. Islamic knowledge search engines.

## 5.2 Dawah to Non-Muslims

21. Free Quran distribution.
22. Introductory books about Islam.
23. Dawah information stands in public spaces.
24. Dawah brochures and educational literature.
25. New Muslim educational packages.
26. Interfaith dialogue events.
27. Public Islamic exhibitions.
28. University Dawah programs.
29. Prison Dawah programs.
30. Hospital Dawah resources.
31. Dawah programs for refugees.
32. Dawah for international communities.
33. Open mosque days.
34. Public Islamic lectures.
35. Comparative religion educational resources.
36. Research-based responses to misconceptions about Islam.
37. Online Dawah conversations.
38. Free Islamic literature libraries.
39. Dawah hotlines and question-and-answer services.
40. Translation of Dawah materials into underserved languages.

## 5.3 New Muslim Support and Retention

41. New Muslim mentorship programs.
42. New Muslim academies.
43. Free introductory Islamic courses.
44. New Muslim support centers.
45. New Muslim welcome packages.
46. Language-specific Islamic education for converts.
47. New Muslim counseling services.
48. Community integration programs.
49. New Muslim retreats.
50. Financial emergency assistance for eligible new Muslims.
51. Islamic family support for converts.
52. Quran learning programs for converts.
53. Islamic education for children of converts.
54. Online new Muslim communities.
55. Long-term new Muslim follow-up programs.

## 5.4 Islamic Education and Knowledge Infrastructure

56. Free Islamic schools.
57. Islamic scholarships.
58. Quran memorization programs.
59. Quran teaching centers.
60. Islamic libraries.
61. Islamic teacher training.
62. Imam development programs.
63. Islamic research institutes.
64. Islamic universities.
65. Online Islamic universities.
66. Free Islamic textbooks.
67. Islamic children's schools.
68. Arabic language education.
69. Quran translation research.
70. Islamic teacher salaries.
71. Islamic curriculum development.
72. Islamic educational accreditation.
73. Scholarships for underserved language communities.
74. Islamic academic publishing.
75. Free Islamic educational platforms.

## 5.5 Translation and Language Accessibility

76. Quran translations into underserved languages.
77. Hadith translations.
78. Islamic book translations.
79. Seerah translations.
80. Islamic lecture subtitles.
81. Islamic video dubbing.
82. Islamic website localization.
83. Islamic terminology dictionaries.
84. Islamic children's book translations.
85. Accessible Islamic resources in Braille and audio formats.
86. Sign-language Dawah.
87. Albanian Islamic educational resources.
88. Islamic resources for minority languages.
89. Islamic translation quality assurance.
90. Open Islamic knowledge libraries.

## 5.6 Physical Dawah Infrastructure

91. Building mosques in underserved communities.
92. Mosque renovation.
93. Mosque educational rooms.
94. Islamic community centers.
95. Physical Islamic libraries.
96. Dedicated Dawah centers.
97. Mosque accessibility improvements.
98. Mosque technology and recording equipment.
99. Rural Islamic education centers.
100.  Islamic student centers.
101.  Women's Islamic learning centers.
102.  Islamic cultural exhibitions.
103.  Community learning facilities.
104.  Mosque libraries for children.
105.  Mobile Dawah facilities and libraries.

## 5.7 Supporting Dawah Workers and Scholars

106. Full-time Dawah worker salaries.
107. Islamic scholars' research.
108. Dawah training programs.
109. Public speaking training.
110. Comparative religion training.
111. Arabic language scholarships.
112. Islamic scholarship scholarships.
113. Muslim chaplaincy programs.
114. Female Islamic educator development.
115. Youth mentorship programs.
116. Islamic research fellowships.
117. Dawah volunteer training.
118. Islamic educational leadership development.
119. Public scholar Q&A and consultation services.
120. Islamic content researchers and fact-checkers.

## 5.8 Dawah for Children and Future Generations

121. Islamic children's cartoons.
122. Islamic storybooks.
123. Islamic educational games.
124. Islamic children's applications.
125. Islamic schools.
126. Weekend Islamic schools.
127. Children's Quran programs.
128. Islamic summer camps.
129. Islamic parenting education.
130. Islamic educational toys.
131. Islamic youth clubs.
132. Muslim youth mentorship.
133. Islamic homeschooling resources.
134. Islamic history education.
135. Islamic character development programs.

## 5.9 Dawah Through Humanitarian Work

136. Muslim-led humanitarian organizations.
137. Free medical clinics.
138. Food distribution programs.
139. Clean water projects.
140. Orphan support programs.
141. Refugee assistance.
142. Disaster relief.
143. Free educational programs.
144. Community development projects.
145. Women's education and vocational training.
146. Disability support programs.
147. Elderly care.
148. Qualified mental and social support services.
149. Vocational training programs.
150. Ethical business development initiatives.

## 5.10 Research, Intellectual Dawah and Contemporary Questions

151. Academic research on Islam.
152. Comparative religion research.
153. Research and educational resources addressing atheism.
154. Philosophy and Islam research.
155. Science and Islam research.
156. Islam and modern ethics research.
157. Islamic economics research.
158. Islam and artificial intelligence research.
159. Islam and environmentalism research.
160. Islam and family life research.
161. Research-based responses to misconceptions about Islam.
162. Islamic historical research.
163. Digital misinformation research about Islam.
164. Islamic academic conferences.
165. Islamic publishing grants.

## 5.11 Technology, AI and Innovative Dawah

166. AI-powered Islamic learning assistants.
167. Quran research assistants.
168. Hadith research platforms.
169. Islamic knowledge search engines.
170. Personalized Islamic learning platforms.
171. AI-assisted Islamic translation.
172. Islamic voice assistants.
173. Quran recitation feedback tools.
174. Islamic educational chatbots.
175. Automated Islamic lecture transcription.
176. Islamic lecture translation and dubbing systems.
177. Islamic knowledge graphs.
178. Dawah analytics platforms.
179. Islamic learning management systems.
180. Open-source Islamic software.

## 5.12 Underserved Muslim Communities

181. Islamic resources for Albanian speakers.
182. Islamic resources for Balkan communities.
183. Rural Muslim education.
184. Islamic education for diaspora children.
185. Islamic education for university students.
186. Islamic resources for elderly people.
187. Islamic education for people with disabilities.
188. Islamic education for prisoners.
189. Islamic family education.
190. Islamic education for professionals.

## 5.13 Additional Institutional and Long-Term Opportunities

191. Establishing a dedicated Islamic Dawah endowment (Waqf).
192. Establishing permanent funding for Islamic educational platforms.
193. Creating an international Islamic translation fund.
194. Establishing a global new Muslim support network.
195. Funding independent Islamic educational research.
196. Creating an open-access Islamic digital library.
197. Establishing an Islamic documentary production fund.
198. Creating a global Islamic scholarship fund.
199. Establishing sustainable funding for rural Islamic teachers.
200. Creating a global Dawah innovation fund.
201. Funding Islamic educational resources for future generations.
202. Establishing Islamic knowledge preservation projects.
203. Creating free Islamic educational resources for low-income communities.
204. Establishing endowments for Quran and Hadith education.
205. Funding the development and maintenance of free Islamic knowledge infrastructure.

All 205 opportunities must be represented as individually discoverable projects. Similar projects may share reusable components and calculation logic.

# 6. Other Charity and Humanitarian Categories

In addition to Dawah, provide the following categories.

## Water and Sanitation

- Building water wells.
- Repairing existing wells.
- Installing water filtration systems.
- Providing clean drinking water.
- Building community water systems.
- Constructing sanitation facilities.
- Supporting water infrastructure maintenance.

## Food and Nutrition

- Providing meals to people in need.
- Supporting food banks.
- Funding community kitchens.
- Providing food packages.
- Supporting sustainable agriculture.
- Providing emergency food assistance.
- Funding school meals.

## Orphans and Vulnerable Children

- Supporting orphan care.
- Providing educational sponsorships.
- Funding children's healthcare.
- Supporting safe accommodation.
- Providing school supplies.
- Supporting vulnerable families.
- Funding child protection programs.

## Healthcare

- Supporting medical clinics.
- Funding essential medical treatment.
- Providing medical equipment.
- Supporting maternal healthcare.
- Funding vaccination programs.
- Supporting mobile medical units.
- Improving hospital infrastructure.

## Education

- Supporting general education.
- Funding university scholarships.
- Providing school supplies.
- Supporting vocational training.
- Funding educational facilities.
- Supporting teachers.
- Providing technology for underserved schools.

## Housing and Shelter

- Providing emergency accommodation.
- Supporting homeless people.
- Building affordable housing.
- Repairing damaged homes.
- Supporting refugees.
- Improving living conditions for vulnerable families.

## Debt Relief and Financial Independence

- Helping people escape financial hardship.
- Supporting ethical employment initiatives.
- Funding vocational training.
- Supporting small businesses.
- Providing tools and equipment for self-employment.
- Supporting financial independence programs.

## Emergency and Humanitarian Relief

- Disaster relief.
- Refugee assistance.
- Emergency medical support.
- Shelter and essential supplies.
- Conflict-affected community assistance.
- Winterization projects.
- Emergency food and water distribution.

## Disability and Elderly Support

- Accessibility improvements.
- Mobility equipment.
- Support for people with disabilities.
- Elderly care.
- Accessible educational resources.
- Community support programs.

## Environment

- Tree planting.
- Environmental restoration.
- Sustainable water infrastructure.
- Waste reduction.
- Renewable energy for community facilities.
- Environmental education.

Every initiative should be purchasable through the same simulator interaction model.

# 7. Project Catalog and Data Model

All projects must use a consistent data structure.

Each project should contain:

| Field              | Purpose                                       |
| ------------------ | --------------------------------------------- |
| ID                 | Unique identifier                             |
| Name               | Project title                                 |
| Category           | Main category                                 |
| Subcategory        | Specific grouping                             |
| Description        | What the project supports                     |
| Image              | Project image or illustration                 |
| Unit               | Well, person, meal, book, year, program, etc. |
| Default cost       | Initial illustrative price                    |
| Custom cost        | User-customized price                         |
| Currency           | Selected currency                             |
| Quantity purchased | Number of units bought                        |
| Impact description | Potential outcome                             |
| Impact type        | Immediate, long-term, ongoing                 |
| Dawah relevance    | Whether it directly supports Dawah            |
| Featured           | Whether to highlight it                       |
| Tags               | Search terms                                  |

Example:

```json
{
  "id": "water-well",
  "name": "Build a Water Well",
  "category": "water",
  "description": "Support access to clean drinking water.",
  "unit": "well",
  "defaultCost": 1500,
  "quantityPurchased": 0,
  "impactType": "long-term",
  "dawahRelevance": false,
  "featured": true
}
```

Keep project definitions separate from user-specific simulator state.

# 8. Project Images and Visual Presentation

Images are an important part of the spending simulator experience.

Use appropriate images or illustrations for individual projects.

Examples:

- Water well: photograph or illustration of a community water well.
- Quran distribution: Quran books.
- Orphan sponsorship: educational and community support.
- Islamic school: school building or classroom.
- Digital Dawah: Islamic educational content displayed on a screen.
- Medical clinic: healthcare facility.
- Food distribution: food packages.
- Mosque construction: mosque architecture.
- Translation projects: books and multilingual content.

Use consistent image dimensions and card layouts.

Avoid using generic icons as the only visual representation for every project.

Do not use misleading images that imply a specific project has already been completed.

Use a local asset directory or appropriately licensed image assets. Ensure the interface remains functional if an image is unavailable.

# 9. Catalog Navigation and Discovery

The experience should remain simple even though there are hundreds of opportunities.

Provide category navigation above the catalog.

Suggested categories:

1. All.
2. Dawah.
3. Quran and Islamic Knowledge.
4. New Muslims.
5. Islamic Education.
6. Translation.
7. Mosques and Infrastructure.
8. Scholars and Educators.
9. Children and Future Generations.
10. Humanitarian Dawah.
11. Research and Technology.
12. Water.
13. Food.
14. Orphans.
15. Healthcare.
16. Education.
17. Housing.
18. Emergency Relief.
19. Environment.

The Dawah category should be visually prominent.

Also provide:

- Search.
- Sort by price, ascending and descending.
- Sort by name.
- Filter by category.
- Featured projects.
- A reset filters action.

Do not let navigation become more complicated than necessary.

# 10. Spending Summary and Progress

At the top of the simulator, display:

**Remaining balance**

A large, prominent monetary value.

**Total spent**

The amount already allocated.

**Starting wealth**

The original hypothetical budget.

**Spending progress**

A percentage and progress bar.

Example:

Starting wealth: $100,000,000

Spent: $25,000,000

Remaining: $75,000,000

Progress: 25%

All values must update immediately.

When the user reaches zero, display a meaningful completion state.

Do not make it difficult to spend the entire balance. Users should be able to adjust quantities and prices to allocate the remaining amount.

# 11. Impact Summary and Receipt

Provide an itemized receipt or summary of everything the user has purchased.

The receipt should include:

- Project name.
- Unit cost.
- Quantity.
- Total allocation.
- Category.
- Potential impact description.

Example:

**Your Impact Receipt**

| Project              | Quantity |   Total |
| -------------------- | -------: | ------: |
| Quran copies         |    2,000 | $10,000 |
| Water wells          |       10 |  $8,000 |
| Meals                |    5,000 | $10,000 |
| New Muslim packages  |      500 | $20,000 |
| Islamic scholarships |        4 | $20,000 |

Total allocated: $68,000.

Remaining: $32,000.

Provide an optional button to open the full receipt.

Allow users to create a shareable summary of their hypothetical portfolio.

Make it clear that the receipt represents a simulation, not real donations or verified outcomes.

# 12. Impact Presentation

The simulator should show what the user's spending could potentially accomplish.

Examples:

- Number of Quran copies.
- Number of meals.
- Number of wells.
- Number of educational scholarships.
- Number of educational programs.
- Number of translation projects.
- Number of community facilities.

For initiatives where the number of beneficiaries is not reliably quantifiable, display the funded project units rather than inventing a beneficiary count.

Distinguish between:

- Amount allocated.
- Number of units potentially funded.
- Estimated people reached.
- Actual verified outcomes.

Never represent hypothetical outcomes as guaranteed results.

# 13. Effective Altruism Through an Islamic Perspective

The simulator should help users explore more than just the number of projects they can purchase.

Projects may be evaluated using:

1. Estimated financial cost.
2. Number of people reached.
3. Number of meaningful learners.
4. Educational effectiveness.
5. Long-term sustainability.
6. Cost per meaningful learning outcome.
7. Neglectedness of the opportunity.
8. Feasibility of implementation.
9. Scalability.
10. Availability of qualified personnel.
11. Reliability of Islamic sources and scholarly oversight.
12. Potential for ongoing benefits (Sadaqah Jariyah).
13. Accessibility to underserved populations.
14. Potential to create additional Dawah initiatives.
15. Alignment with Islamic principles and intentions.

Do not create arbitrary universal impact scores.

Dawah should not be evaluated only through views, downloads, or materials distributed. Meaningful learning, quality of knowledge, accessibility, and sustainability also matter.

# 14. Suggested Spending Challenges

Add optional challenges that users can explore.

- Spend $1,000 on meaningful initiatives.
- Spend $10,000 on Dawah and humanitarian work.
- Spend $100,000 across multiple categories.
- Spend $1 million on long-term impact.
- Allocate an entire budget exclusively to Dawah.
- Support as many people as possible with a selected amount.
- Build a diversified impact portfolio.
- Explore what can be accomplished by supporting future generations.

Challenges should use the same simulator interface, not a separate complicated experience.

# 15. Sadaqah Jariyah and Long-Term Impact

Include a way to identify projects with potential ongoing benefits.

Examples:

- Building a water well.
- Establishing a library.
- Funding an Islamic educational platform.
- Supporting Quran teaching infrastructure.
- Establishing a Waqf.
- Funding a sustainable Islamic school.
- Supporting educational resources for future generations.
- Funding an open-access knowledge archive.

Distinguish:

**One-time impact:** A meal, a book, or a temporary emergency intervention.

**Ongoing impact:** Infrastructure, educational institutions, endowments, and resources that may continue benefiting people.

Introduce the Islamic concept of ongoing charity through the narration in Sahih Muslim 1631.

Do not guarantee that a specific project will continue producing benefits indefinitely.

# 16. Islamic Values and Accuracy

Relevant themes include:

- Sadaqah.
- Sadaqah Jariyah.
- Waqf.
- Ihsan.
- Rahmah.
- Helping those in need.
- Beneficial knowledge.
- Human dignity.
- Sincerity.
- Wisdom in Dawah.

Potential Quranic references for an educational information section:

- Quran 2:261.
- Quran 2:177.
- Quran 2:215.
- Quran 2:262.
- Quran 2:267.
- Quran 2:280.
- Quran 9:60.
- Quran 76:8–9.

Requirements:

- Avoid inventing Quranic quotations or hadith.
- Avoid presenting disputed matters as universally agreed.
- Avoid promising specific spiritual rewards.
- Avoid guaranteeing religious outcomes.
- Emphasize wisdom, sincerity, and accurate knowledge in Dawah.
- Never make humanitarian assistance conditional on religious conversion.
- Present Islamic educational content responsibly.

Do not introduce Zakat eligibility labels, classifications, badges, or filters. This application is about exploring hypothetical impact, not determining the religious eligibility of expenditures.

# 17. Visual Identity

Use a modern, premium, and calm Islamic-inspired visual identity.

Suggested palette:

- Deep emerald green.
- Warm gold.
- Ivory.
- White.
- Dark charcoal.

Use subtle Islamic geometric patterns where appropriate.

The design should be clean and contemporary.

Prioritize:

- Clear numbers.
- Strong typography.
- Visually engaging project images.
- Simple buttons.
- Responsive cards.
- Immediate interaction feedback.

Avoid:

- Excessive decorative Islamic patterns.
- A conventional charity website appearance.
- Complicated dashboards.
- Too many navigation pages.
- Unnecessary animations.
- Overly large explanatory text.
- Excessive modal dialogs.

The simulator itself should remain the main attraction.

# 18. Technical Requirements

Inspect the existing local repository before implementation.

Use its existing architecture where practical, but do not preserve the disliked original interface merely for the sake of preserving it.

The objective is to create the new simulator experience directly inside the existing project directory.

## 18.1 Application state

The application must track:

```javascript
{
  startingWealth: 100000,
  currency: "USD",
  totalSpent: 0,
  remainingBalance: 100000,
  purchasedQuantities: {},
  customPrices: {},
  selectedCategory: "all",
  searchQuery: ""
}
```

Use a reliable state-management approach compatible with the existing project.

## 18.2 Calculations

For each project:

`totalCost = quantityPurchased * customizedUnitCost`

For the whole simulator:

`totalSpent = sum(all project allocations)`

`remainingBalance = startingWealth - totalSpent`

`spendingProgress = totalSpent / startingWealth * 100`

Use safe monetary calculations and avoid floating-point errors where possible.

Ensure that:

- Quantities cannot become negative.
- Remaining balance cannot become negative.
- Buying checks affordability.
- Selling refunds the correct amount.
- Price changes are reflected consistently.
- Large monetary values are formatted clearly.

## 18.3 Persistence

Use localStorage for the MVP.

Persist:

- Starting wealth.
- Currency.
- Purchased quantities.
- Customized project prices.
- Relevant user preferences.

Provide a complete reset action.

No backend, authentication, payments, or database are required for the MVP.

## 18.4 Performance

The application will contain hundreds of project opportunities.

Ensure:

- Smooth scrolling.
- Responsive interactions.
- Efficient filtering.
- No unnecessary rerendering.
- Optimized image loading.
- No expensive rendering of large numbers of objects.

The simulator must work well on ordinary laptops and mobile devices.

# 19. Responsive Design

Desktop:

- Prominent wealth summary.
- Clear category navigation.
- Multi-column project card layout.
- Visible balance during browsing.

Mobile:

- Prominent compact balance summary.
- Responsive project cards.
- Easy-to-tap Buy and Sell controls.
- Accessible quantity multipliers.
- Simple category navigation.
- No horizontal overflow.

All core functionality must work on mobile.

# 20. MVP Requirements

The first release must include:

1. Interactive spending simulator experience.
2. Flexible starting wealth.
3. Remaining balance and spending progress.
4. Visual project cards.
5. Buy and Sell controls.
6. Quantity multipliers.
7. Custom quantities.
8. Editable project prices.
9. Reset-to-default pricing.
10. USD, EUR, and GBP.
11. All 205 Dawah opportunities.
12. General humanitarian opportunities.
13. Category navigation.
14. Search and sorting.
15. Itemized impact receipt.
16. Dynamic calculations.
17. Local persistence.
18. Responsive desktop and mobile interface.
19. Complete simulation reset.

Avoid building secondary features before the core spending experience works perfectly.

# 21. Acceptance Criteria

The implementation is complete when:

1. The application opens directly into the simulator.
2. The interface resembles the simplicity and interaction model of the reference spending simulator.
3. The user can select any starting wealth.
4. The remaining balance updates immediately.
5. Every project has Buy and Sell controls.
6. Quantity multipliers work correctly.
7. Users can enter custom quantities.
8. Every project has an editable cost.
9. Changing the cost updates all relevant calculations.
10. Customized prices persist after refresh.
11. Users can reset an individual project's price.
12. All 205 Dawah opportunities are available.
13. Dawah is prominently featured.
14. Other humanitarian categories are available.
15. Users can search and filter projects.
16. Users cannot accidentally overspend.
17. Users can sell previously purchased quantities.
18. The itemized receipt reflects all allocations.
19. Currency selection works.
20. The application works on mobile and desktop.
21. Hypothetical impact is never presented as verified impact.
22. No Zakat eligibility classification is displayed.

# 22. Implementation Instructions

Work directly in the existing local project directory.

Follow this sequence:

**Step 1 — Inspect**

- Understand the existing project structure.
- Identify the current framework and dependencies.
- Understand the existing application.
- Identify reusable code.
- Determine what should be replaced.

**Step 2 — Implement the simulator layout**

- Build the wealth summary.
- Build the spending progress indicator.
- Build the project card layout.
- Implement the Buy and Sell controls.
- Implement quantity multipliers.

**Step 3 — Implement the wealth engine**

- Flexible starting wealth.
- Dynamic balance.
- Spending calculations.
- Selling and refunds.
- Overspending protection.

**Step 4 — Implement editable pricing**

- Inline price editing.
- Custom prices.
- Reset-to-default.
- Currency selection.
- Persistence.

**Step 5 — Build the complete catalog**

- Add all 205 Dawah opportunities.
- Add the humanitarian categories.
- Add initial illustrative prices.
- Add appropriate images.
- Implement category navigation.

**Step 6 — Implement discovery**

- Search.
- Filtering.
- Sorting.
- Featured Dawah projects.

**Step 7 — Implement the receipt**

- Itemized purchases.
- Quantities.
- Unit costs.
- Total allocations.
- Remaining balance.
- Potential impact descriptions.

**Step 8 — Polish**

- Apply the visual identity.
- Improve interactions.
- Optimize images.
- Ensure mobile responsiveness.
- Verify accessibility.

**Step 9 — Test**

Test:

- $100 starting wealth.
- $1,000 starting wealth.
- $10,000 starting wealth.
- $100,000 starting wealth.
- $1 million starting wealth.
- Buying one Quran.
- Buying 100 Quran copies.
- Buying 1,000 water wells.
- Selling previously purchased projects.
- Changing a water well price from $1,500 to $800.
- Changing Quran prices.
- Switching currencies.
- Changing starting wealth after purchasing items.
- Refreshing the application.
- Resetting individual prices.
- Resetting the entire simulation.
- Trying to spend more than the remaining balance.
- Using the application on mobile.

**Do not stop after producing an implementation plan. Implement the application, test it, and fix the identified issues.**

---

# 23. Final Product Direction

The Wealthy Muslim should feel like a modern spending simulator, but with a completely different purpose.

The user should immediately understand:

"I have this much wealth. What could I accomplish with it?"

They should be able to browse hundreds of initiatives, buy them, sell them, change their prices, experiment with different quantities, and see the results immediately.

A person with $100 should find meaningful opportunities.

A person with $100 million should be able to explore funding entire Islamic educational institutions, international Dawah infrastructure, humanitarian initiatives, and long-term charitable projects.

Someone living in Africa should be able to customize the price of a water well to reflect their local circumstances.

Someone in the Balkans should be able to customize the price of Quran distribution, Islamic education, or other initiatives.

Dawah and Islamic knowledge should be among the strongest themes throughout the simulator.

**The ultimate goal:**

"I never realized how much good could potentially be achieved with the wealth I have."
