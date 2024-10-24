# Game Design Requirements Document

## Overview

This game combines the classic **Snake** and **Tetris**, aiming to provide players with a unique and challenging experience. The design focuses on high modularity for ease of development, maintenance, and expansion, ensuring low coupling between modules to avoid interference and integration issues.

## Game Flow

1. **Start Game**: The game begins in Snake mode, with the snake moving in a fixed area to find fruits.
2. **Mode Switch**: When the snake eats a fruit, it transforms into a Tetris block, switching to Tetris mode.
3. **Control Tetris Block**: Players can move the block left, right, down, and rotate it.
4. **Line Clearing**: When the block hits the bottom or fills a line, the line is cleared, and the game switches back to Snake mode.
5. **Restart Game**: Players can press **R** to restart the game, resetting all scores and states.

## Module Breakdown

To achieve high modularity, the game is divided into the following main modules, each responsible for specific functions and interacting through clear interfaces:

### 1. Main Page Module (`index.html`)

- **Responsibilities**:
  - Provides the basic framework and structure of the game.
  - Includes all necessary HTML elements like canvas, control panel, and scoreboard.
  - Imports all JavaScript and CSS files.

- **Design Points**:
  - **Scalability**: Structure should allow easy addition or removal of modules.
  - **No Business Logic**: Only responsible for presentation and basic structure, no game logic.

### 2. Game Manager Module (`gameManager.js`)

- **Responsibilities**:
  - Manages the overall state and flow of the game, including mode switching, game start, and restart.
  - Coordinates interactions between modules.

- **Interfaces**:
  - Initializes all other modules.
  - Provides methods to switch game modes.
  - Manages game loop and update mechanism.

- **Design Points**:
  - **Single Responsibility Principle**: Only responsible for game flow and state management, not specific game logic.
  - **Low Coupling**: Interacts with other modules through interfaces, avoiding direct dependencies.

### 3. Snake Module (`snake.js`)

- **Responsibilities**:
  - Manages the snake's behavior, such as movement, growth, and collision detection.
  - Handles interactions with fruits.

- **Interfaces**:
  - Provides methods to control the snake's direction and movement.
  - Notifies the game manager module when the snake eats a fruit.

- **Design Points**:
  - **Reusability**: Independent of the game manager module, can be reused in other contexts.
  - **Encapsulation**: Internal state and methods are not exposed, interacting only through public interfaces.

### 4. Tetris Module (`tetris.js`)

- **Responsibilities**:
  - Manages the generation, movement, rotation, and line clearing of blocks.
  - Handles collision detection with the game area.

- **Interfaces**:
  - Provides methods to control block movement and rotation.
  - Notifies the game manager module when a line is cleared or a block is fixed.

- **Design Points**:
  - **Single Responsibility**: Focuses on block behavior and logic, not other game elements.
  - **High Cohesion**: All block-related functions are concentrated within this module.

### 5. Render Module (`render.js`)

- **Responsibilities**:
  - Renders the game state onto the HTML canvas.
  - Draws game elements based on the current mode (Snake or Tetris).

- **Interfaces**:
  - Provides rendering methods, receiving the current game state from the game manager module.
  - Subscribes to game state changes for real-time updates.

- **Design Points**:
  - **No Business Logic**: Only responsible for visual presentation, separate from game logic.
  - **Flexibility**: Easy to adjust rendering methods or add new visual effects.

### 6. Scoreboard Module (`scoreboard.js`)

- **Responsibilities**:
  - Manages and displays various scores in the game, including Snake score, Tetris score, and total score.
  - Provides methods to update and reset scores.

- **Interfaces**:
  - Provides methods to increase different types of scores.
  - Provides methods to reset scores.

- **Design Points**:
  - **Data-Driven**: All score calculations and storage are handled within this module.
  - **Visual Separation**: Only responsible for score management and display, not other game logic.

### 7. Input Handler Module (`inputHandler.js`)

- **Responsibilities**:
  - Listens to and processes player keyboard inputs.
  - Converts inputs into game actions, such as snake movement or block control.

- **Interfaces**:
  - Calls control methods of the Snake or Tetris module based on the current game mode.

- **Design Points**:
  - **Decoupling**: Does not directly operate game modules, but controls them through the game manager module.
  - **Extensibility**: Easy to add new input methods or modify existing control methods.

### 8. Utility Module (`utility.js`)

- **Responsibilities**:
  - Provides general functions needed in the game, such as random number generators and deep copy.

- **Interfaces**:
  - Provides static methods for other modules to call.

- **Design Points**:
  - **Highly General**: Functions should be unrelated to specific game logic and reusable across different modules.
  - **Stateless**: Only provides utility methods, does not store any state.

## Module Interactions

- **Game Manager Module** acts as the core, initializing and coordinating all modules.
- **Input Handler Module** receives player inputs and forwards them to the appropriate game module through the game manager module.
- **Snake Module** and **Tetris Module** manage their respective game logic and switch modes through the game manager module.
- **Render Module** periodically gets the current game state from the game manager module and updates the display.
- **Scoreboard Module** updates and displays scores based on notifications from game modules.
- **Utility Module** provides necessary auxiliary functions for other modules.

## Development and Testing Strategy

- **Unit Testing**: Write individual tests for each module to ensure their functionality.
- **Integration Testing**: Test interactions between modules to ensure interfaces work correctly.
- **Continuous Integration**: Use CI tools to automatically run tests and check code quality.
- **Code Review**: Regularly review code to ensure it meets design specifications and maintains consistency.

## Measures to Avoid Interference and Integration Issues

1. **Clear Interface Definitions**:
   - Each module should interact only through public methods and events, avoiding direct access to internal states.
   
2. **Low Coupling**:
   - Minimize dependencies between modules, using the game manager module for indirect communication.
   
3. **High Cohesion**:
   - Each module should focus on its own responsibilities, avoiding unnecessary functions.
   
4. **Event-Driven Mechanism**:
   - Use events to trigger interactions between modules, reducing direct method calls and increasing flexibility.
   
5. **Version Control and Dependency Management**:
   - Use version control systems to manage code changes and clearly define dependencies between modules.
   
6. **Documentation and Code Comments**:
   - Write clear documentation for each module and its interfaces to facilitate understanding and maintenance.

## Summary

By designing the game with a highly modular structure, each module has clear responsibilities and low coupling, facilitating development and maintenance while effectively avoiding interference and integration issues. Future feature expansions can be easily implemented on the existing architecture, ensuring sustainable development and high quality of the game.

# 遊戲設計需求文件

## 概述

本遊戲結合了經典的貪食蛇與俄羅斯方塊，旨在提供玩家一個獨特且富有挑戰性的遊戲體驗。遊戲設計注重高度模組化，以便於開發、維護及擴展，並確保各模組之間的低耦合性，避免互相干涉和整合問題。

## 遊戲流程

1. **開始遊戲**：遊戲初始於貪食蛇模式，蛇在固定大小的遊戲區域內移動並尋找水果。
2. **模式切換**：當蛇吃到水果後，水果轉變為一個俄羅斯方塊，並切換至俄羅斯方塊模式。
3. **控制俄羅斯方塊**：玩家可控制方塊的左右移動、下移及旋轉。
4. **行消除**：方塊觸底或填滿一行後，消除滿行並切換回貪食蛇模式。
5. **重啟遊戲**：玩家可隨時按 **R** 鍵重新開始遊戲，重置所有分數和遊戲狀態。

## 模組分解

為實現高度模組化，遊戲將被分解為以下主要模組，每個模組負責特定的功能，並通過明確的接口進行交互：

### 1. 主頁面模組 (`index.html`)

- **職責**：
  - 提供遊戲的基本框架和結構。
  - 包含所有必要的HTML元素，如畫布、控制面板和計分板。
  - 引入所有JavaScript和CSS檔案。

- **設計要點**：
  - **可擴展性**：結構應易於新增或移除模組。
  - **無業務邏輯**：僅負責呈現和基礎結構，不包含遊戲邏輯。

### 2. 遊戲管理模組 (`gameManager.js`)

- **職責**：
  - 管理遊戲的整體狀態和流程，包括模式切換、遊戲開始與重啟。
  - 協調各個模組之間的交互。

- **接口**：
  - 初始化所有其他模組。
  - 提供方法來切換遊戲模式。
  - 管理遊戲循環和更新機制。

- **設計要點**：
  - **單一職責原則**：僅負責遊戲流程和狀態管理，不涉及具體遊戲邏輯。
  - **低耦合**：通過接口與其他模組互動，避免直接依賴。

### 3. 貪食蛇模組 (`snake.js`)

- **職責**：
  - 管理貪食蛇的行為，如移動、增長和碰撞檢測。
  - 處理與水果的交互。

- **接口**：
  - 提供方法控制蛇的方向和移動。
  - 通知遊戲管理模組當蛇吃到水果時。

- **設計要點**：
  - **可重用性**：獨立於遊戲管理模組，可在其他情境下重用。
  - **封裝性**：內部狀態和方法不對外暴露，僅通過公開接口進行互動。

### 4. 俄羅斯方塊模組 (`tetris.js`)

- **職責**：
  - 管理方塊的生成、移動、旋轉和行消除。
  - 處理方塊與遊戲區域的碰撞檢測。

- **接口**：
  - 提供方法控制方塊的移動和旋轉。
  - 通知遊戲管理模組當行被消除或方塊固定時。

- **設計要點**：
  - **單一職責**：專注於方塊的行為和邏輯，不涉及其他遊戲元素。
  - **高內聚**：所有與方塊相關的功能集中在此模組內。

### 5. 渲染模組 (`render.js`)

- **職責**：
  - 負責將遊戲狀態渲染至HTML畫布（Canvas）上。
  - 根據當前模式（貪食蛇或俄羅斯方塊）繪製相應的遊戲元素。

- **接口**：
  - 提供渲染方法，從遊戲管理模組接收當前遊戲狀態。
  - 可訂閱遊戲狀態的變化以實時更新畫面。

- **設計要點**：
  - **無業務邏輯**：僅負責視覺呈現，與遊戲邏輯分離。
  - **靈活性**：易於調整渲染方式或添加新視覺效果。

### 6. 計分板模組 (`scoreboard.js`)

- **職責**：
  - 管理和顯示遊戲中的各類分數，包括貪食蛇得分、俄羅斯方塊得分和總得分。
  - 提供方法來更新和重置分數。

- **接口**：
  - 提供方法來增加不同類型的分數。
  - 提供方法來重置分數。

- **設計要點**：
  - **數據驅動**：所有分數的計算和存儲在此模組內進行。
  - **視覺分離**：僅負責分數的管理和顯示，不涉及其他遊戲邏輯。

### 7. 輸入處理模組 (`inputHandler.js`)

- **職責**：
  - 監聽並處理玩家的鍵盤輸入。
  - 將輸入轉換為遊戲中的動作，如蛇的移動或方塊的控制。

- **接口**：
  - 根據當前遊戲模式，調用貪食蛇或俄羅斯方塊模組的控制方法。

- **設計要點**：
  - **解耦合**：不直接操作遊戲模組，而是通過遊戲管理模組進行間接控制。
  - **擴展性**：易於添加新的輸入方式或修改現有控制方式。

### 8. 工具模組 (`utility.js`)

- **職責**：
  - 提供遊戲中所需的通用功能，如隨機數生成器、深拷貝等。

- **接口**：
  - 提供靜態方法供其他模組調用。

- **設計要點**：
  - **高度通用**：功能應該與具體遊戲邏輯無關，可在不同模組中重用。
  - **無狀態**：僅提供工具方法，不保存任何狀態。

## 模組之間的交互

- **遊戲管理模組** 作為核心，負責初始化和協調各個模組。
- **輸入處理模組** 接收玩家的輸入，並通過遊戲管理模組轉發至相應的遊戲模組。
- **貪食蛇模組** 和 **俄羅斯方塊模組** 分別管理各自的遊戲邏輯，並通過遊戲管理模組進行模式切換。
- **渲染模組** 定期從遊戲管理模組獲取當前遊戲狀態，並更新畫面。
- **計分板模組** 根據遊戲模組的通知，更新和顯示分數。
- **工具模組** 提供所需的輔助功能，供其他模組調用。

## 開發與測試策略

- **單元測試**：為每個模組編寫單獨的測試，確保其功能正確。
- **集成測試**：測試模組之間的交互，確保接口正常工作。
- **持續集成**：使用持續集成工具，自動執行測試並檢查代碼質量。
- **代碼審查**：定期進行代碼審查，確保代碼符合設計規範並保持一致性。

## 避免干涉和整合問題的措施

1. **明確的接口定義**：
   - 每個模組應僅通過公開的方法和事件進行互動，避免直接訪問其他模組的內部狀態。
   
2. **低耦合性**：
   - 模組之間應儘量減少依賴，通過遊戲管理模組進行間接通信。
   
3. **高內聚性**：
   - 每個模組應專注於自己的職責範圍，避免承擔多餘的功能。
   
4. **使用事件驅動機制**：
   - 通過事件來觸發模組間的交互，減少直接方法調用，提升靈活性。
   
5. **版本控制和依賴管理**：
   - 使用版本控制系統管理代碼變更，並明確定義模組之間的依賴關係。
   
6. **文檔和代碼註釋**：
   - 為每個模組和其接口撰寫清晰的文檔，便於理解和維護。

## 總結

通過將遊戲設計為高度模組化的結構，各模組之間具有明確的職責和低耦合性，不僅便於開發和維護，還能有效避免各模組之間的干涉和整合問題。未來的功能擴展也能在現有架構上輕鬆實現，確保遊戲的可持續發展和高質量。
