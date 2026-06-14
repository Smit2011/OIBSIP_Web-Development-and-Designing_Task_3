# Temperature Converter Web App

A responsive, single-page temperature conversion application built using HTML, CSS, and vanilla JavaScript.

Repository target:
- https://github.com/Smit2011/OIBSIP_Web-Development-and-Designing_Task_3

## Task Overview

This project is a Temperature Converter that allows users to:
- Enter a temperature value
- Select an input unit (Celsius, Fahrenheit, Kelvin)
- Select an output unit (Celsius, Fahrenheit, Kelvin)
- Convert instantly with a clear result display

It also includes quality-of-life features such as:
- Input validation with inline error messaging
- Swap units button
- Reset button
- Recent conversion history (last 5 conversions)
- Clear history option
- Enter key support for quick conversion

## Tech Stack

- HTML5 for page structure
- CSS3 for styling, animations, and responsive layout
- Vanilla JavaScript (ES6) for conversion logic and interactivity

No external libraries or frameworks were used.

## Project Structure

- index.html: Main UI structure of the app
- style.css: Glassmorphism UI, animations, responsive rules, and component styling
- script.js: Conversion logic, validation, events, and history handling
- README.md: Task explanation and implementation process

## Features Implemented

1. Multi-unit conversion:
- Celsius to Fahrenheit / Kelvin
- Fahrenheit to Celsius / Kelvin
- Kelvin to Celsius / Fahrenheit

2. Validation and error handling:
- Empty input protection
- Non-numeric value protection
- User-friendly inline error feedback

3. Unit controls:
- Distinct From and To unit selectors
- Automatic guard to avoid both selectors being the same unit
- Quick swap action

4. Result UX:
- Clear output format: input + source unit = converted + target unit
- Rounded output (2 decimal places)
- Animated result reveal for better visual feedback

5. Conversion history:
- Stores last 5 results
- Displays most recent conversion first
- Clear history button appears only when needed

6. Responsive UI:
- Desktop and mobile-friendly layout
- Adaptive control stacking on smaller screens

## Conversion Logic Summary

The conversion process uses Celsius as a common intermediate unit:

1. Convert input value from source unit to Celsius
2. Convert Celsius value to target unit
3. Display rounded result

This two-step approach keeps logic simple, consistent, and easy to maintain.

## Process Followed

1. Requirement understanding
- Identified required behavior for converting between three temperature units
- Planned usability enhancements (swap, reset, validation, history)

2. UI planning and structure
- Built semantic sections in HTML for:
  - Input
  - Unit selectors
  - Actions
  - Result
  - History

3. Styling implementation
- Designed a modern glassmorphism interface
- Added animated background blobs and card-level motion
- Added responsive breakpoints for mobile devices

4. JavaScript implementation
- Added reusable conversion function
- Implemented validation and error display helpers
- Connected event listeners for buttons, dropdown changes, and keyboard actions
- Added dynamic history rendering and clear-history behavior

5. Manual testing scenarios
- Same-unit conversion behavior
- Decimal and negative values
- Empty and invalid input
- Swap and reset actions
- History overflow behavior (retains latest 5)
- Mobile layout checks

## How To Run

Option 1:
- Open index.html directly in a browser

Option 2:
- Use VS Code Live Server for local development preview

## Future Enhancements

- Persist conversion history using localStorage
- Add copy-to-clipboard result action
- Add unit-specific input constraints/tooltips
- Add dark/light theme toggle

## Author

Prepared as part of OIBSIP Web Development and Designing Task 3.
