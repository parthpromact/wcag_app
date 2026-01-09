# WCAG 2.1 AA Compliance Documentation
## Operable Principle - Travel Platform
### Explore, Experience, and Interactive Components

## OPERABLE (Principle 2)

### 2.1 Keyboard Accessible

#### 2.1.1 Keyboard (Level A)
**Requirement:** All functionality is available through keyboard interface without requiring specific timings for individual keystrokes.

**Implementation:**
- All interactive elements (links, buttons, form controls) are keyboard accessible
- Tab key navigates through all interactive elements
- Enter/Space activates buttons and links
- Arrow keys navigate carousel slides and map
- All features work without mouse

**Code Location:**
- `components/navbar/Navbar.tsx` - Keyboard accessible navigation
- `components/explore/SearchBar.tsx` - Keyboard accessible search
- `components/explore/FilterPanel.tsx` - Keyboard accessible filters with Enter key support
- `components/experience/HeroSection.tsx` - Arrow key carousel navigation
- All interactive components throughout the application

**Benefits:**
- ✅ Blind users with screen readers
- ✅ Motor impairment users who cannot use mouse
- ✅ Keyboard-only users
- ✅ Power users who prefer keyboard shortcuts

#### 2.1.2 No Keyboard Trap (Level A)
**Requirement:** Keyboard focus can be moved away from any component using only keyboard.

**Implementation:**
- ESC key closes all modals and overlays
- Focus returns to trigger element when modal closes
- Tab wraps within modal boundaries (focus trap)
- Background becomes inert when modal is open
- No component traps keyboard focus permanently

**Code Location:**
- `components/experience/ExperienceDetailModal.tsx` - ESC key handler and focus management
- `components/explore/FilterPanel.tsx` - ESC key closes mobile filter panel
- `components/navbar/Navbar.tsx` - ESC key closes search and sitemap modals

**Benefits:**
- ✅ All keyboard users can escape any component
- ✅ Screen reader users maintain navigation control
- ✅ Provides clear exit mechanism for all users

#### 2.1.4 Character Key Shortcuts (Level A)
**Requirement:** If character key shortcuts exist, they can be turned off, remapped, or only active when component has focus.

**Implementation:**
- Keyboard shortcuts use modifier keys (Ctrl+K) to prevent conflicts
- Single-key shortcuts only active when specific component has focus
- Shortcuts disabled when focus is in text input fields
- Arrow key shortcuts only work when carousel/map is focused
- Space key only works in carousel context

**Code Location:**
- `components/experience/HeroSection.tsx` - Context-aware arrow key and space bar shortcuts
- `components/navbar/Navbar.tsx` - Ctrl+K search shortcut with modifier key
- `components/explore/InteractiveMap.tsx` - Map keyboard shortcuts only when map focused

**Benefits:**
- ✅ Screen reader users - shortcuts don't interfere with typing
- ✅ Voice input users - character keys don't trigger unwanted actions
- ✅ All users - documented and contextual shortcuts

### 2.2 Enough Time

#### 2.2.1 Timing Adjustable (Level A)
**Requirement:** For time limits, user can turn off, adjust, or extend the time limit.

**Implementation:**
- Carousel auto-play speed is user-adjustable (Fast: 3s, Normal: 5s, Slow: 8s)
- Speed controls accessible via buttons
- Changes take effect immediately
- No session timeouts implemented
- No timed actions require user response

**Code Location:**
- `components/experience/HeroSection.tsx` - Carousel timing controls with three speed options

**Benefits:**
- ✅ Cognitive disability users can slow down content
- ✅ Reading disability users get more time
- ✅ Older users can adjust to comfortable pace
- ✅ Motor impairment users have time to interact

#### 2.2.2 Pause, Stop, Hide (Level A)
**Requirement:** For moving, blinking, or auto-updating content, user can pause, stop, or hide it.

**Implementation:**
- Carousel has pause/play button
- Auto-rotation can be stopped completely
- Paused state persists until user changes it
- Multiple control methods (button, space key)
- No auto-updating content without controls

**Code Location:**
- `components/experience/HeroSection.tsx` - Pause/play button with toggle state

**Benefits:**
- ✅ ADHD users can stop distracting movement
- ✅ Reading disability users can pause to read
- ✅ Vestibular disorder users can stop motion causing discomfort
- ✅ Photosensitive users control animations

### 2.3 Seizures and Physical Reactions

#### 2.3.1 Three Flashes or Below Threshold (Level A)
**Requirement:** Content does not contain anything that flashes more than three times per second.

**Implementation:**
- All transitions are smooth (1000ms duration)
- No rapid flashing or blinking content
- Carousel transitions at maximum 1 per 3-8 seconds
- Loading spinners rotate smoothly (1 rotation per second)
- Respects prefers-reduced-motion system preference

**Code Location:**
- `components/experience/HeroSection.tsx` - Smooth 1-second fade transitions
- `components/explore/InteractiveMap.tsx` - Reduced motion detection and handling
- All components - CSS transitions with appropriate durations

**Benefits:**
- ✅ Photosensitive epilepsy users - no seizure triggers
- ✅ Vestibular disorder users - smooth motion reduces discomfort
- ✅ Motion sickness users - no rapid changes
- ✅ All users - professional, comfortable experience

### 2.4 Navigable

#### 2.4.1 Bypass Blocks (Level A)
**Requirement:** A mechanism is available to bypass blocks of content repeated on multiple pages.

**Implementation:**
- "Skip to main content" link appears on first Tab press
- Link jumps focus directly to main content area
- Semantic landmarks (main, nav, aside) for screen reader navigation
- Bypasses logo, navigation menu, search, and header controls

**Code Location:**
- `components/navbar/Navbar.tsx` - Skip link with sr-only/focus:not-sr-only classes
- `components/explore/ExploreInteractive.tsx` - Main landmark
- `components/explore/FilterPanel.tsx` - Aside landmark

**Benefits:**
- ✅ Keyboard users skip repetitive navigation (saves 5-10 tab presses)
- ✅ Screen reader users jump to content
- ✅ Motor impairment users reduce keystrokes needed

#### 2.4.2 Page Titled (Level A)
**Requirement:** Web pages have titles that describe topic or purpose.

**Implementation:**
- Every page has a unique, descriptive `<title>` tag
- Titles follow pattern: "Page Purpose | Accessible Travel Platform"
- Examples: "Discover Destinations | Accessible Travel", "Paris Experiences | Accessible Travel"

**Code Location:**
- `explore/page.tsx` - Base title setup
- Individual page components set specific titles via Next.js metadata
- All routes define meaningful page titles

**Benefits:**
- ✅ Screen reader users immediately know page purpose
- ✅ All users see clear tab/window titles
- ✅ Improves orientation and bookmarking

#### 2.4.3 Focus Order (Level A)
**Requirement:** Components receive focus in an order that preserves meaning and operability.

**Implementation:**
- Tab order follows visual layout (top-to-bottom, left-to-right)
- Modal focus trap with circular navigation
- Form fields follow logical sequence
- No CSS positioning tricks breaking tab order
- Conditional focus management for expanded sections

**Code Location:**
- `components/explore/SearchBar.tsx` - Logical form field order
- `components/experience/ExperienceDetailModal.tsx` - Modal focus trap with Tab/Shift+Tab handling
- All form components maintain DOM order matching visual order

**Benefits:**
- ✅ Keyboard users - intuitive, predictable navigation
- ✅ Screen reader users - logical reading sequence
- ✅ Cognitive disability users - reduced confusion

#### 2.4.4 Link Purpose (In Context) (Level A)
**Requirement:** Purpose of each link can be determined from link text or context.

**Implementation:**
- All links have descriptive text
- Enhanced ARIA labels provide full context
- Button text clearly describes action
- Context from surrounding card/section supplements link text
- Multiple similar links differentiated with aria-label

**Code Location:**
- `components/explore/DestinationCard.tsx` - Contextual aria-labels on "Explore Experiences" links
- `components/experience/ExperienceCard.tsx` - Aria-labels include experience titles
- All link components provide clear purpose

**Benefits:**
- ✅ Screen reader users understand complete link purpose
- ✅ Voice control users can target specific links
- ✅ All users know what clicking will do

#### 2.4.5 Multiple Ways (Level AA)
**Requirement:** More than one way is available to locate pages within a set of pages.

**Implementation:**
- Method 1: Primary navigation menu in navbar
- Method 2: Search functionality (Ctrl+K shortcut)
- Method 3: Complete site map with hierarchical structure
- Bonus: Interactive map for visual/spatial navigation
- All methods provide access to same content

**Code Location:**
- `components/navbar/Navbar.tsx` - Navigation menu, search modal, sitemap modal
- `components/explore/InteractiveMap.tsx` - Visual map navigation alternative

**Benefits:**
- ✅ Different navigation styles for different users
- ✅ Screen reader users choose preferred method
- ✅ Cognitive disability users use what works for them
- ✅ Power users access via keyboard shortcuts

#### 2.4.6 Headings and Labels (Level AA)
**Requirement:** Headings and labels describe topic or purpose.

**Implementation:**
- Clear, descriptive page headings (H1)
- Section headings organized hierarchically (H2, H3)
- All form labels visible and descriptive
- Labels associated with inputs via htmlFor/id
- Required fields marked with asterisk and aria-label

**Code Location:**
- `components/explore/ExploreInteractive.tsx` - "Discover Accessible Destinations" heading
- `components/explore/SearchBar.tsx` - Visible labels for all form controls
- `components/explore/FilterPanel.tsx` - Section headings for filter groups

**Benefits:**
- ✅ Screen reader users navigate by headings
- ✅ All users understand page structure
- ✅ Form labels clarify input purpose

#### 2.4.7 Focus Visible (Level AA)
**Requirement:** Keyboard focus indicator is visible.

**Implementation:**
- 2px focus rings on all interactive elements
- High contrast colors (white on dark, colored on light)
- Custom focus styles replace browser defaults
- Focus indicators never hidden
- Consistent styling across all components

**Code Location:**
- All components use focus:ring-2 focus:ring-[color] Tailwind classes
- `components/navbar/Navbar.tsx` - White focus rings on dark background
- Custom focus styles throughout application

**Benefits:**
- ✅ Keyboard users always see focus position
- ✅ Low vision users - high contrast indicators
- ✅ Motor impairment users know active element

### 2.5 Input Modalities

#### 2.5.1 Pointer Gestures (Level A)
**Requirement:** All functionality that uses multipoint or path-based gestures has single-pointer alternative.

**Implementation:**
- Zoom buttons replace pinch-to-zoom requirement
- Single-finger drag instead of multi-touch pan
- Keyboard controls for all map operations
- No functionality requires complex gestures
- Touch gestures remain available but not required

**Code Location:**
- `components/explore/InteractiveMap.tsx` - Zoom buttons, keyboard controls, single-pointer drag

**Benefits:**
- ✅ Motor impairment users - single tap instead of pinch
- ✅ Tremor users - large button targets
- ✅ One-handed users - single finger operation
- ✅ Mouse users - works without multi-touch

#### 2.5.2 Pointer Cancellation (Level A)
**Requirement:** For single-pointer functionality, down-event is not used to execute function.

**Implementation:**
- All actions use onClick (up-event), not onMouseDown
- Users can abort by moving pointer away before release
- Standard button behavior throughout
- Drag operations complete on mouse-up/touch-end
- No actions trigger on press, only on release

**Code Location:**
- `components/experience/HeroSection.tsx` - onClick handlers, not onMouseDown
- `components/explore/InteractiveMap.tsx` - Drag completes on up-event
- All button components use standard click events

**Benefits:**
- ✅ Motor impairment users can abort accidental presses
- ✅ Tremor users - accidental press doesn't trigger
- ✅ All users - forgiving interaction model

#### 2.5.3 Label in Name (Level A)
**Requirement:** For user interface components with labels that include text or images of text, the name contains the text that is presented visually.

**Implementation:**
- Accessible names match or include visible labels
- ARIA labels/aria-labelledby include visible text
- Buttons with icons include visible text or matching aria-label
- Form inputs use visible `<label>` text in accessible name
- No mismatch between visual label and programmatic name

**Code Location:**
- `components/explore/SearchBar.tsx` - Input aria-label includes "Search destinations"
- `components/navbar/Navbar.tsx` - Icon buttons have aria-label matching visible tooltip/text
- All form controls use visible label text in accessible name

**Benefits:**
- ✅ Voice control users can activate by speaking visible label
- ✅ Screen reader users get consistent experience
- ✅ All users benefit from predictable interactions

#### 2.5.4 Motion Actuation (Level A)
**Requirement:** Functionality triggered by device motion can be disabled and has alternative UI control.

**Implementation:**
- Device motion OFF by default
- Toggle checkbox to enable/disable motion
- Automatically disabled when system prefers-reduced-motion is set
- All map functionality available via buttons/keyboard
- Motion is enhancement only, never required

**Code Location:**
- `components/explore/InteractiveMap.tsx` - Motion toggle, button controls, keyboard alternatives

**Benefits:**
- ✅ Vestibular disorder users can disable motion
- ✅ Tremor users not forced to use device tilt
- ✅ Motion sickness users prevent symptoms
- ✅ All users have choice of interaction method

### Compliance Summary Table

| Criterion                  | Level | Status          | Components                          |
|----------------------------|-------|-----------------|-------------------------------------|
| 2.1.1 Keyboard             | A     | ✅ Compliant    | All components                      |
| 2.1.2 No Keyboard Trap     | A     | ✅ Compliant    | Modals, overlays                    |
| 2.1.4 Character Key Shortcuts | A  | ✅ Compliant    | HeroSection, Navbar, Map            |
| 2.2.1 Timing Adjustable    | A     | ✅ Compliant    | HeroSection                         |
| 2.2.2 Pause, Stop, Hide    | A     | ✅ Compliant    | HeroSection                         |
| 2.3.1 Three Flashes        | A     | ✅ Compliant    | All components                      |
| 2.4.1 Bypass Blocks        | A     | ✅ Compliant    | Navbar, page structure              |
| 2.4.2 Page Titled          | A     | ✅ Compliant    | All pages                           |
| 2.4.3 Focus Order          | A     | ✅ Compliant    | All forms, modals                   |
| 2.4.4 Link Purpose         | A     | ✅ Compliant    | All links and buttons               |
| 2.4.5 Multiple Ways        | AA    | ✅ Compliant    | Navbar, Map                         |
| 2.4.6 Headings and Labels  | AA    | ✅ Compliant    | All pages                           |
| 2.4.7 Focus Visible        | AA    | ✅ Compliant    | All interactive elements            |
| 2.5.1 Pointer Gestures     | A     | ✅ Compliant    | InteractiveMap                      |
| 2.5.2 Pointer Cancellation | A     | ✅ Compliant    | All buttons                         |
| 2.5.3 Label in Name        | A     | ✅ Compliant    | All form controls, buttons          |
| 2.5.4 Motion Actuation     | A     | ✅ Compliant    | InteractiveMap                      |

**Total Compliance:** 17/17 success criteria (100%)

### Key Features

#### Keyboard Navigation
- Complete keyboard access to all functionality
- Visible focus indicators (2px rings)
- ESC key closes all modals
- Character shortcuts with modifier keys
- Context-aware shortcut activation

#### Timing Controls
- Adjustable carousel speed (3s/5s/8s)
- Pause/play controls
- No time limits on user actions
- User-controlled content flow

#### Multiple Navigation Methods
1. Primary navigation menu
2. Search with Ctrl+K shortcut
3. Complete site map
4. Interactive visual map

#### Gesture Alternatives
- Button controls for zoom
- Keyboard navigation for map
- Single-pointer alternatives
- Optional device motion

#### Accessibility Features
- Skip to main content link
- Semantic landmarks
- ARIA labels throughout
- Reduced motion support
- High contrast focus indicators
- Descriptive page titles on every page
- Accessible names match visible labels

---

**Document Version:** 1.0  
**Last Updated:** 2026  
**Pages Covered:** Explore (`/explore`), Experience (`/experience`), Destinarion (`/accessible-destination`) and Interactive components like Map, Sitemap and Site Search.