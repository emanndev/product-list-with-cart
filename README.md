# Product List with Cart

A modern, responsive Angular application for browsing a dessert product catalog and managing a shopping cart. Built with Angular, this project features product cards with animations, a list of desserts with theri prices, category and names, a cart, an order popup modal and automatic scrolling to the cart on mobile/tablet views. The app is deployed on Netlify for easy access.

## Features

-- **Product Catalog:** Displays a grid of dessert products fetched from a local JSON file (data.json).

-- **Responsive Design:** Optimized for desktop, tablet, and mobile devices with adaptive layouts (breakpoints at 900px and 800px).

-- **Shopping Cart:** Add, remove, increase, or decrease quantities of desserts in the cart with real-time updates.

-- **Animations:** Smooth fade-in animations for product cards on load.

-- **Auto-Scroll:** Scrolls to the cart section on mobile/tablet when items are added or updated.

-- **Order Confirmation:** Modal for confirming orders, with the ability to start a new order.

-- **Unit Tests:** Comprehensive Jasmine tests for components and services, ensuring reliability.

## Tech Stack

-- **Framework:** Angular 19
-- **Language:** TypeScript
-- **Styling:** SCSS with custom mixins and variables
-- **Testing:** Jasmine, Karma
-- **Deployment:** Netlify
-- **Version Control:** Git (GitHub)

## Installation

Clone the Repository:
git clone (<https://github.com/emanndev/product-list-with-cart>)
cd product-list-with-cart

Install Dependencies:
npm install

This installs all dependencies listed in package.json, including @angular/core.

Run the Development Server:
ng serve

Open <http://localhost:4200> in your browser to view the app.
The app auto-reloads on code changes.

## Project Structure

product-list-with-cart/
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ ├── product-card/ # Displays individual dessert cards
│ │ │ ├── add-to-cart/ # Handles cart actions (add, increase, decrease)
│ │ │ ├── cart/ # Shows cart contents and order confirmation
│ │ │ ├── order-confirmation/ # Modal for order confirmation
│ │ ├── services/
│ │ │ ├── cart.service.ts # Manages cart state (add, remove, clear)
│ │ │ ├── main-logic.service.ts # Fetches dessert data from data.json
│ │ ├── model/
│ │ │ ├── dessert.interface.ts # Dessert and image interfaces
│ │ │ ├── cartItem.interface.ts # Cart item interface
│ │ ├── styles/
│ │ │ ├── mixins.scss # SCSS mixins for layouts
│ │ │ ├── variables.scss # SCSS variables (colors, typography)
│ │ ├── app.component.ts # Root component with layout
│ │ ├── app.config.ts # App configuration
│ ├── assets/
│ ├── images/ # dessert jpg, SVG and other assets
│ ├── data.json # Dessert data
├── angular.json # Angular build configuration
├── package.json # Dependencies and scripts
├── README.md # Readme file

## Testing

The project includes unit tests written with Jasmine and run via Karma.

Run Tests:
ng test

Opens a browser with the Karma test runner.
Tests cover component creation, cart operations, service data fetching, and order confirmation.

Test Coverage:

Components: ProductCardComponent, AddToCartComponent, CartComponent, OrderConfirmationComponent
Services: MainLogicService, CartServiceService
Features tested: Input handling, cart actions, HTTP requests, scrolling, and modal interactions.

Headless Testing (for CI):
ng test --watch=false --browsers=ChromeHeadless

## Usage

-- **Browse Desserts:**

View a grid of desserts with images, names, categories, and prices.

-- **Manage Cart:**

Click “Add to Cart” to add a dessert.
Use “+”/“-” buttons to adjust quantities.
Remove items from the cart.

-- **Confirm Order:**

View the cart total and items.
Click “Confirm Order” to open the order confirmation modal.
Start a new order to clear the cart.

## Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/new-feature).
Commit changes (git commit -m "Add new feature").
Push to the branch (git push origin feature/new-feature).
Open a pull request.

## License

No license
