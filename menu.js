// シングルトンパターン - ナビゲーション管理クラス
class NavigationManager {
    static instance;
  
  
    constructor() {
      if (NavigationManager.instance) {
        return NavigationManager.instance;
      }
  
      this.menu = document.getElementById("nav-menu");
      this.hamburger = document.getElementById("hamburger");
      this.observers = [];
  
      this.hamburger.addEventListener("click", () => this.toggleMenu());
      document.addEventListener("click", (event) => this.handleOutsideClick(event));
  
      NavigationManager.instance = this;
    }
  
    toggleMenu() {
      this.menu.classList.toggle("open");
      this.notifyObservers(this.menu.classList.contains("open"));
    }
  
    handleOutsideClick(event) {
      if (!this.menu.contains(event.target) && !this.hamburger.contains(event.target)) {
        this.menu.classList.remove("open");
        this.notifyObservers(false);
      }
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    notifyObservers(state) {
      this.observers.forEach(observer => observer.update(state));
    }
  }
  
  // ファクトリパターン - メニューの種類を作成
  class MenuFactory {
    static createMenu(type) {
      switch (type) {
        case "side":
          return new SideMenu();
        case "top":
          return new TopMenu();
        default:
          throw new Error("Unknown menu type");
      }
    }
  }
  
  // サイドメニューのクラス
  class SideMenu {
    constructor() {
      console.log("サイドメニューを作成");
    }
  }
  
  // 上部メニューのクラス
  class TopMenu {
    constructor() {
      console.log("上部メニューを作成");
    }
  }
  
  // オブザーバーパターン - ログ出力
  class MenuLogger {
    update(state) {
      console.log(`メニューの状態: ${state ? "開く" : "閉じる"}`);
    }
  }
  
  // デコレータパターン - 追加機能（アニメーション）
  class AnimatedMenu {
    constructor(menu) {
      this.menu = menu;
    }
  
    animateOpen() {
      this.menu.style.transition = "left 0.5s ease-in-out";
    }
  }
  
  // 初期化処理
  document.addEventListener("DOMContentLoaded", () => {
    const navManager = new NavigationManager();
    const logger = new MenuLogger();
    navManager.addObserver(logger);
  
    // メニューの種類を作成
    const sideMenu = MenuFactory.createMenu("side");
  
    // アニメーションの追加
    const animatedMenu = new AnimatedMenu(navManager.menu);
    animatedMenu.animateOpen();
  });