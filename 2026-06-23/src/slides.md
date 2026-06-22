---
theme: ycs77
title: 我發過的那些 Composer & NPM 套件們：開源入門與心得分享
highlighter: shiki
download: https://talks.star-note-lucas.me/2026/laravel-event-june/pdf
info: |
  ## 我發過的那些 Composer & NPM 套件們：開源入門與心得分享

  講者：Lucas Yang
---

<h1 class="!text-5xl !font-light !leading-tight">我發過的那些<br><YellowText bold>Composer & NPM</YellowText> 套件們：</h1>
<hr class="my-4 border-gray-300" />
<h2 class="!text-3xl">開源入門與心得分享</h2>

---
layout: intro
---

# Lucas Yang

<ul class="leading-8 opacity-80">
  <li>喜好：宅在家刻網站 | 寫程式 | 看動漫 | 玩遊戲</li>
  <li>工作：蜂巢數據科技的全端工程師</li>
  <li>框架：Laravel / Vue.js / Tailwind CSS</li>
  <li>套件：npm 30+，Composer 10+</li>
  <li>2020 年：PHP 也有 Day 56 講者</li>
  <li>2021 年：{Laravel x Vue}Conf Taiwan 講者</li>
</ul>

<div class="my-10 grid grid-cols-[28px_1fr] items-center justify-center w-min gap-y-4">
  <div class="i-ri-github-line m-auto ml-0 text-xl opacity-50" />
  <div><a href="https://github.com/ycs77" target="_blank">ycs77</a></div>
  <div class="i-ri-user-3-line m-auto ml-0 text-xl opacity-50" />
  <div><a href="https://star-note-lucas.me" target="_blank" class="whitespace-nowrap">star-note-lucas.me</a></div>
</div>

<div class="absolute top-0 right-0 mt-20 mr-28">
  <StarAvatar>
    <img src="https://cdn.jsdelivr.net/npm/slidev-theme-ycs77/public/images/lucas_avatar.jpg" class="!rounded-full w-40" />
  </StarAvatar>
</div>

<!--

- 沉迷於開發套件
- 雖然一大半以上，有些是純粹給自己用的，有些是實驗用的

-->

---

# Agenda

- 從介紹開源和套件開始
- Composer 套件的構成
- NPM 套件的構成
- 分享我開發的套件們

<!--

1. 先了解開源和套件的概念
2. 然後再來分享我為什麼會想要開發套件？

-->

---
layout: center
class: text-center
---

# 你有沒有安裝/使用過套件？

<div class="mt-8">

```bash
npm install vue
```

</div>

<div class="mt-4">

```bash
composer require laravel/boost
```

</div>

<!--

- 有沒有安裝/使用過套件？
- 有沒有完整寫過一個套件並發布呢？

-->

---

# 從套件而了解到的「開源」

- 純 JS 套件
- jQuery
- Laravel
- Vue

<!--

- jQuery / jQuery Plugin
- Laravel / Laravel Package
- Vue / Vue Plugin

-->

---

# 狹義的開源 vs 廣義的開源

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<v-clicks>
<div>

### 狹義的開源

- 單純將原始碼公開放在 **GitHub** 或其他平台
- 不一定有 **License**
- 不一定接受外部貢獻

</div>
<div>

### 廣義的開源

- 原始碼公開，並附上明確的**授權條款**（MIT、Apache...）
- 允許他人**自由使用、修改、散布**
- **開放社群參與**（PR、Issues）
- 提供完整的**使用文件**（README、Docs）

</div>
</v-clicks>
</div>

---

# 什麼是套件 (Package / Plugin)？

<v-clicks>

- **不修改本體程式碼**，即可擴充額外功能
- 可透過**套件管理工具**（npm / Composer）直接安裝，或可以手動下載安裝
- 有**版本管理**，方便升級、回滾與維護
- 套件 ≠ 模組（Module）⸺但今天不深究這個問題
  - **Node.js**：ESM 與 CommonJS 模組
  - **PHP**：PSR-4 與 Composer 套件
- Package ≠ Plugin⸺但今天也是不深究這個問題

</v-clicks>

---
layout: center
class: text-center
---

# <YellowText bold>Composer</YellowText> 套件和 <YellowText bold>NPM</YellowText> 套件的構成

---

# Composer 套件

最少必要的檔案結構：

- `composer.json` ⸺套件的設定與描述檔
- `src/` ⸺主要程式碼目錄
- `README.md` ⸺使用說明文件

額外的檔案：

- `LICENSE` ⸺開源授權聲明
- `.gitignore`/`.gitattributes` ⸺Git 版控設定
- `tests/` ⸺測試程式碼目錄

---

# composer.json

```json {all|2-5|6-11|12-21|22-23}
{
    "name": "vendor/package-name",
    "description": "套件的描述",
    "type": "library",
    "license": "MIT",
    "require": {
        "php": "^8.2"
    },
    "require-dev": {
        "phpunit/phpunit": "^11.0"
    },
    "autoload": {
        "psr-4": {
            "Vendor\\PackageName\\": "src/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Vendor\\PackageName\\Tests\\": "tests/"
        }
    },
    "minimum-stability": "stable",
    "prefer-stable": true
}
```

---

# Composer 套件的 `src/` 目錄

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<div>

*src/MyClass.php*
```php
<?php

namespace Vendor\PackageName;

class MyClass
{
    public function doSomething(string $name): string
    {
        return "Hello, $name!";
    }
}
```

</div>
<div>

使用方式：

```php
use Vendor\PackageName\MyClass;

$myClass = new MyClass();

echo $myClass->doSomething('Lucas'); // 輸出：Hello, Lucas!
```

</div>
</div>

---

# Laravel 套件的 composer.json

```json
{
    // ...
    "require": {
        "php": "^8.2",
        "illuminate/config": "^11.0 || ^12.0 || ^13.0",
        "illuminate/contracts": "^11.0 || ^12.0 || ^13.0"
    },
    "extra": {
        "laravel": {
            "providers": [
                "Vendor\\PackageName\\PackageNameServiceProvider"
            ],
            "aliases": {
                "PackageName": "Vendor\\PackageName\\Facades\\PackageName"
            }
        }
    },
    // ...
}
```

---

# Laravel 套件的 `src/` 目錄

*src/PackageNameServiceProvider.php*
```php
<?php

namespace Vendor\PackageName;

class PackageNameServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // 註冊服務
        // * 載入 Config
        // * 綁定服務容器 (Service Container)
    }

    public function boot(): void
    {
        // 啟動服務
        // * 載入路由
        // * 載入視圖
        // * 載入資源檔案 (CSS / JS)
    }
}
```

---

# Laravel 套件的 `src/` 目錄

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<div>

*src/Facades/PackageName.php*
```php
<?php

namespace Vendor\PackageName;

use Illuminate\Support\Facades\Facade;

/**
 * @method static string doSomething(string $name)
 */
class PackageName extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'my-class'; // 對應 Service Container 綁定的名稱
    }
}
```

</div>
<div>

使用方式：

```php
use Vendor\PackageName\Facades\PackageName;

echo PackageName::doSomething('Lucas'); // 輸出：Hello, Lucas!
```

</div>
</div>

---

# 發布 Composer 套件

- 註冊 **Packagist** 帳號，並連結 **GitHub Repo**
- 在 GitHub 上**建立 Release** 和 **Tag 新版本**
- **Packagist 會自動抓取**新版本的 commit hash，或手動觸發更新
- 使用 `composer require vendor/package-name` 安裝套件，會從 GitHub 下載對應版本的 zip 檔案

---

# NPM 套件

最少必要的檔案結構：

- `package.json` ⸺套件設定與描述檔
- `index.js` / `index.ts` ⸺主要進入點（entrypoint）
- `README.md` ⸺使用說明文件

額外的檔案：

- `LICENSE` ⸺開源授權聲明
- `.npmignore` ⸺控制發佈到 npm 的內容

---

# package.json

```json
{
  "name": "package-name",
  "version": "1.0.0",
  "description": "套件的描述",
  "author": "Your Name",
  "license": "MIT",
  "main": "dist/index.js",
  "files": ["dist"]
}
```

---

# NPM 套件 (ESM) 的 `src/` 目錄

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<v-clicks at="-0" every="2">
<div>

*src/index.js*
```js
export function doSomething(name) {
  return `Hello, ${name}!`
}
```

</div>
<div>

使用方式：

```js
import { doSomething } from 'package-name'

console.log(doSomething('Lucas')) // 輸出：Hello, Lucas!
```

</div>
<div>

*src/index.js*
```js
export class MyClass {
  doSomething(name) {
    return `Hello, ${name}!`
  }
}
```

</div>
<div>

使用方式：

```js
import { MyClass } from 'package-name'

const myClass = new MyClass()

console.log(myClass.doSomething('Lucas')) // 輸出：Hello, Lucas!
```

</div>
</v-clicks>
</div>

<!--

- 這是 ESM 套件的寫法
  1. 導出函式
  2. 導出類別

-->

---

# jQuery 套件

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<div>

*src/index.js*
```js
$.fn.myButton = function (options) {
  const $button = $(this)
    .text(options.content)
    .css('color', 'red');

  $button.on('click', function () {
    alert(`You clicked: ${options.content}`);
  });
};
```

</div>
<div>

使用方式：

```html
<button id="my-button-element"></button>

<script>
  $(function () {
    $('#my-button-element').myButton({
      content: 'Click Me',
    });
  });
</script>
```

</div>
</div>

---

# 編譯 NPM 套件

<v-clicks at="-0">

- 使用打包工具將 **原始碼** 編譯成 **瀏覽器或 Node.js 可用的格式**
  - **TypeScript** 編譯成 **JavaScript**
  - **Vue SFC** 編譯成 **JavaScript 和 CSS**
  - 輸出 **ESM** 和 **CommonJS** 格式的 `.js` 檔案，以便在不同環境中使用
- 常見工具
  - **Webpack/Rollup**: 過去的主流打包工具
  - **esbuild**: 使用 Golang 編寫的超快速打包工具
  - **Vite**: 前端應用開發/打包工具，以使用 Rust 編寫的 Rolldown 作為核心
  - **tsdown**: 前端套件打包工具，以使用 Rust 編寫的 Rolldown 作為核心

</v-clicks>

<!--

- PHP 只會在 **伺服器端** 執行，通常不需要編譯
- JavaScript 有可能會在 **瀏覽器端** 和 **Node.js 端** 執行，因此需要編譯成不同的格式

-->

---

# 發布 NPM 套件

- 註冊 **NPM 帳號**
- 在 GitHub 上**建立 Release** 和 **Tag 新版本**
- 使用 `npm publish` 發佈到 **NPM Registry**
- 或是透過 **Trusted publishing (OIDC)** 自動化發佈流程
- 使用 `npm install package-name` 安裝套件

---
layout: center
class: text-center
---

# 接下來是，我和 <YellowText bold>開源套件們</YellowText> 的故事...

---

# 當遇見了程式

- 國中時期，第一次接觸到程式
- 家裡的一本 **ASP** 的書，和一本 **JavaScript** 的書
- 最一開始很單純，只是覺得只要打一些字，就可以讓網頁出現一些不同的效果，覺得很神奇~
- 然後就幫認識的人做了幾個小網站練習

---

# 音樂播放器

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<div>

![](/assets/ycsaudio-screenshot.jpg)

</div>
<div class="pt-2">

- 前端：jQuery
- 後端：ASP
- 資料庫：Microsoft Access
- 文件儲存：Google Drive
- 線上環境：ASP 的共享主機

</div>
</div>

---

# jQuery 要怎麼寫? 用 jQuery Plugin 的寫法

<v-clicks>

- 一開始只會寫 JavaScript
- 有一次幫忙改一個網站，要增加一個圖片輪播的功能
- 然後就用純 JavaScript 寫了一個簡單的圖片輪播
- 結果後來才在網路上看到有 jQuery 的圖片輪播 Plugin
- 然後就從這個 Plugin 的原始碼來學如何寫 jQuery Plugin...
- 以至於短時間內以為 jQuery Plugin 是寫 jQuery 的唯一方式...

</v-clicks>

---

# 在音樂播放器內使用 jQuery Plugin 寫法

```html
<div id="player" class="player"></div>

<script>
  $(function(){
    $('#player').ycsaudio({
      id:    '<%=id%>',
      url:   '<%=url%>',
      title: '<%=title%>'<%if (listName != 'null') {%>,
      list: [
        <%for (var i = 0; i < listAudioAryID.length - 1; i++) {%>{
          id:    '<%=listAudioAryID[i]%>',
          title: '<%=listAudioAryTitle[i]%>'
        },<%}%>
      ],
      listData: {id: '<%=listid%>', name: '<%=listName%>'}<%}if (autoplay == 'false' || autoplay == '0') {%>,
      autoplay: false<%}if (mes == 'me') {%>,
      me: 'me'<%}%>
    });
  })
</script>
```

---

# jQuery bsModel <a class="i-ri-github-line inline-block" href="https://github.com/ycs77/jquery-plugin-bsModal" target="_blank" /> <a class="i-ri-npmjs-fill inline-block" href="https://www.npmjs.com/package/jquery-plugin-bsmodal" target="_blank" />

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<div>

![](/assets/jquery-plugin-bsmodal.jpg)

</div>
<div class="pt-2">

- 第一個 npm 套件
- 可以快速建立 Bootstrap Modal
- 支援彈窗建立、圖片裁剪等功能
- 用於快速建立剪裁使用者 Avatar 的彈窗

</div>
</div>

<!--

- 後來學會 jQuery 和 Bootstrap 之後
- 就陸續寫了幾個 jQuery Plugin
- 其中一個就是這個

-->

---

# 給 Laravel 發 PR

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<div>

![](/assets/laravel-pr-1.jpg)

</div>
<div class="pt-2">

- 線上 3D 模型購買平台的案子
- 登入機制需要增加類似 **指數退避** 的功能來阻止暴力破解
  - Laravel 預設都是 **固定時間** 的鎖定機制，登入錯誤後都固定鎖定 **1 分鐘**
  - 但是客戶希望鎖定時間可以失敗後會鎖 **3 分鐘**，下次 **5 分鐘**，下次 **10 分鐘**
- 但是 Laravel 的 `src/Illuminate/Cache/RateLimiter.php` 沒有這個功能
- 因此就自己實作了這個功能，然後發了一個 PR 給 Laravel

</div>
</div>

---

# 給 Laravel 發 PR

![](/assets/laravel-pr-2.jpg)

<!--

- 問我說我有沒有測試過了？
- 然後我留言說我測試過了
- 這是第一次知道什麼是 Unit Test
- 當然這個 PR 最後是被拒絕了

-->

---

# 給 Laravel 發 PR

<div class="[&_img]:h-[420px]">

![](/assets/laravel-pr-3.jpg)

</div>

<!--

- 後來數年之後，我遇到了問題
- 但是別人發布的修復的 PR 被關閉了
- 因此我幫忙補上測試之後又發了一個 PR
- 這次 PR 終於被 Merge 了
- 終於也可以自稱說是 Laravel 的貢獻者了~

-->

---

# Laravel Newebpay <a class="i-ri-github-line inline-block" href="https://github.com/ycs77/laravel-newebpay" target="_blank" /> <a class="i-ri-php-fill inline-block" href="https://packagist.org/packages/ycs77/laravel-newebpay" target="_blank" />

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<div>

![](/assets/laravel-newebpay.jpg)

</div>
<div class="pt-2">

- 藍新金流的**非官方 Laravel 套件**
- Fork 別人寫的版本來繼續維護，可以不用每個專案都要照著藍新的文件來寫一次金流串接程式了
- 改寫成了比較優雅的 Laravel 套件的寫法
- 但維護到後來時，也會開始覺得想要放棄...
- 最近正在重構到 v2 版本中...

</div>
</div>

---

# Laravel Wizard <a class="i-ri-github-line inline-block" href="https://github.com/ycs77/laravel-wizard" target="_blank" /> <a class="i-ri-php-fill inline-block" href="https://packagist.org/packages/ycs77/laravel-wizard" target="_blank" />

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<div>

![](/assets/laravel-wizard.jpg)

</div>
<div class="pt-2">

- Laravel 安裝精靈套件
- 可以使用在註冊流程、購物流程等需要多步驟的流程中
- 曾經有個人在這個套件 Issues 問超多問題，甚至還問說能不能幫忙看他的程式碼

</div>
</div>

<!--

- 我就跟他說：如果你贊助我一個月，我就幫你看
- 然後他就真的贊助了我一個月了，加了 Discord 來問我問題
- 這是第一次有人贊助我來幫他解決問題~

-->

---

# Headless UI Float <a class="i-ri-github-line inline-block" href="https://github.com/ycs77/headlessui-float" target="_blank" /> <a class="i-ri-npmjs-fill inline-block" href="https://www.npmjs.com/package/@headlessui-float/vue" target="_blank" />

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<div>

![](/assets/headlessui-float.jpg)

</div>
<div class="pt-2">

- 為 **Headless UI** 寫的**浮動定位套件**，為 Dropdown、Popover 等提供浮動定位的功能
- 支援 **React**、**Vue**、**Nuxt**
- GitHub **350+** Stars、npm 週下載量 **30,000+**
- 使用方式相對簡單，但內部實作相對複雜
- 需要使用 hack 的方式，因此如果上游的版本有改動，可能就會壞掉
- **現在已經 Archive 了**

</div>
</div>

<!--

- 看著 GitHub Stars 和 npm 下載量慢慢增加，真的會覺得很有成就感啊~
- 後來 Headless UI 升級到 v2，已經支援基本的浮動元素功能
- v2 無法 hack 內部的 API，同時我也無力維護，因此就 Archive 了

-->

---

# Termwind 修復 CJK (中日韓) 文字排版 PR <a class="i-ri-github-line inline-block" href="https://github.com/nunomaduro/termwind/pull/186" target="_blank" />

<v-clicks at="-0" every="2">

- 從 2024/06 一直到 2025/10
- 瘋狂 at Francisco、nuno maduro、Taylor 三位和寄了好幾封 Email 才終於 Merge 了
- 雖然是 Termwind 的問題，但是會影響到 Laravel 的 Artisan CLI 和 Pest 的 CJK (中日韓) 文字排版
- 當然英文一直都是正常的
- 功能雖然能用，但是看著會不大舒服
- 原因是 `mb_strlen()` 會把中文當成 1 個字元來計算，需要改成使用 `mb_strwidth()` 才能正確計算中文的寬度 (學到冷知識了...)
- 順便認識了一位網友 James

</v-clicks>

<!--

- Francisco 和 nuno maduro 都是 Termwind 的 Author
- 每次 PR 有問題都需要另一位 Author 來 Review 才能繼續下一步...
- 一旦其中一位沒有回覆了，就會卡在那裡很久...

-->

---

# Laravel CLI 修復

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<div>

###### Before

![](/assets/termwind-1.jpg)

</div>
<div>

###### After

![](/assets/termwind-2.jpg)

</div>
</div>

---

# Pest 測試畫面修復

<div class="grid grid-cols-2 gap-x-6 gap-y-2">
<div>

###### Before

![](/assets/termwind-3.jpg)

</div>
<div>

###### After

![](/assets/termwind-4.jpg)

</div>
</div>

---
layout: center
class: text-center
---

# <YellowText bold>AI 時代</YellowText> 還需要開發套件嗎?

<!--

- CLI 工具
- MCP 套件
- 但至少可以透過 AI 來加速開發套件的過程

-->

---

# 開發 MCP 套件

- 今年年初在做一個案子時
- 串接 API 需要一直開 Swegger UI 來看 API 的資訊
- 那個 Swegger UI 的使用者體驗真的很差，載入速度巨慢
- 但同時又需要使用 AI Agent 來幫忙加速開發
- 因此開發此套件，讓 AI Agent 可以加速讀取 API 的資訊，來加速前端串接後端 API 的過程

---

# apifable <a class="i-ri-github-line inline-block" href="https://github.com/ycs77/apifable" target="_blank" /> <a class="i-ri-npmjs-fill inline-block" href="https://www.npmjs.com/package/apifable" target="_blank" />

- AI Agent 讀 OpenAPI Spec 的 MCP
- MCP 會去解析 `openapi.yaml`
- Agent 就可以直接獲取 Endpoint、看 Schema、看 TypeScript 型別
- 加速前端串接後端 API 的過程
- 同時也實驗了 AI Agent 來幫忙開發套件的過程

<!--

- 差不多是在 2026 年初的時候開發的
- 在半年之前(2025年)還是會相對排斥 AI Agent
- 半年後已經相對比較接受 AI Agent 來幫忙開發套件的過程
- 現在已經是「沒了你我怎麼活啊？」

-->

---
layout: center
class: text-center
---

![](/assets/apifable-screenshot-1.jpg)

---
layout: center
class: text-center
---

![](/assets/apifable-screenshot-2.jpg)

---
layout: center
class: text-center
---

# 為什麼會想要開發<YellowText bold>套件</YellowText>？

<!--

- 介紹了那麼多套件
- 這時就會問說，「為什麼會想要開發套件呢？」
- 可能會說：套件可以提供別人許多功能
- 可能會說：套件可以幫助別人解決問題
- 但都抵不過一句

-->

---
layout: center
class: text-center
---

# 因為，開發<YellowText bold>套件</YellowText>的過程真的很好玩啊~
