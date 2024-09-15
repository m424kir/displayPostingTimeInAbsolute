// ==UserScript==
// @name            Display posting time in absolute
// @namespace       M424
// @version         0.0.1
// @author          M424
// @description:ja  ポストされた投稿時間を絶対時間(24/01/01(月) 00:00)で表示する
// @license         MIT
// @icon            https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @downloadURL     https://github.com/m424kir/displayPostingTimeInAbsolute/raw/main/dist/displayPostingTimeInAbsolute.user.js
// @updateURL       https://github.com/m424kir/displayPostingTimeInAbsolute/raw/main/dist/displayPostingTimeInAbsolute.user.js
// @match           *://x.com/*
// @match           *://*.com/i/tweetdeck
// @match           *://misskey.io/*
// @require         https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js
// @require         https://cdn.jsdelivr.net/npm/dayjs@1/locale/ja.js
// @grant           none
// @run-at          document-idle
// ==/UserScript==

(function (dayjs) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  class UrlEntryWithDateFormatImpl {
    /**
     * コンストラクタ
     * @param {RegExp} pattern - URLパターンを表す正規表現
     * @param {string} selector - HTML要素のセレクタ
     * @param {string} [style=''] - 対象セレクタに適用するスタイル
     * @param {string} [format='YY/MM/DD(ddd) HH:mm'] - `dayjs`の日付フォーマット
     * @param {string} [attributeName='datetime'] - 既存の日付情報取得用の属性名
     * @param {string} [locale='ja'] - 日付フォーマットに使用するロケール情報
     * @constructor
     */
    constructor(pattern, selector, style = "", format = "YY/MM/DD(ddd) HH:mm", attributeName = "datetime", locale = "ja") {
      /** URLパターンを表す正規表現
       * @type {RegExp}
       * @public
       */
      __publicField(this, "pattern");
      /**
       * HTML要素のセレクタ
       * @type {string}
       * @public
       */
      __publicField(this, "selector");
      /**
       * 対象セレクタに適用するスタイル
       * @type {string}
       * @public
       */
      __publicField(this, "style");
      /**
       * `Dayjs`の日付フォーマット
       * @type {string}
       * @example 'YYYY-MM-DD hh:mm:ss'
       * @public
       */
      __publicField(this, "format");
      /**
       * ロケール情報
       * @type {string}
       * @example 'ja', 'en'
       * @public
       */
      __publicField(this, "locale");
      /**
       * 既存の日付情報取得用の属性名
       * @type {string}
       * @public
       */
      __publicField(this, "attributeName");
      this.pattern = pattern;
      this.selector = selector;
      this.style = style;
      this.format = format;
      this.locale = locale;
      this.attributeName = attributeName;
    }
    /**
     * 指定されたLocationがこのパターン二マッチするか判定します
     * @param {Location} location - 判定対象のLocationオブジェクト
     * @return {boolean} true if パターンマッチ
     */
    is(location) {
      return this.pattern.test(location.href);
    }
    /**
     * Dayjs指定のフォーマット形式の日付文字列に変換する
     * @param {dayjs.ConfigType} date dayjsで認識可能な日付形式
     * @return {string} 日付文字列
     */
    formatDate(date) {
      return dayjs(date).format(this.format);
    }
    /**
     * `UrlEntryWithDateFormatImpl` のインスタンスを作成します。
     *
     * @param {RegExp} pattern - URLパターンを表す正規表現。
     * @param {string} selector - HTML要素のセレクタ。
     * @param {string} [style=''] - 対象セレクタに適用するスタイル。デフォルトは空文字。
     * @param {string} [format='YY/MM/DD(ddd) HH:mm'] - `dayjs`の日付フォーマット。デフォルトは `'YY/MM/DD(ddd) HH:mm'`。
     * @param {string} [attributeName='datetime'] - HTML要素の属性名。デフォルトは `'datetime'`。
     * @param {string} [locale='ja'] - 日付フォーマットに使用するロケール情報。デフォルトは `'ja'`。
     * @returns {UrlEntryWithDateFormatImpl} 新しく作成された `UrlEntryWithDateFormatImpl` のインスタンス。
     * @static
     * @public
     */
    static create(pattern, selector, style = "", format = "YY/MM/DD(ddd) HH:mm", attributeName = "datetime", locale = "ja") {
      let ret = new UrlEntryWithDateFormatImpl(
        pattern,
        selector,
        style,
        format,
        attributeName,
        locale
      );
      return ret;
    }
  }
  function toStr(value) {
    return value ?? "";
  }
  Element.prototype.attr = function(attr, value) {
    if (value === void 0) {
      return this.getAttribute(attr) || "";
    }
    this.setAttribute(attr, value);
    return "";
  };
  class TimestampUpdater {
    /**
     * コンストラクタ
     *
     * @param {number} intervalMs - タイマーの間隔（ミリ秒）。
     * @constructor
     */
    constructor(intervalMs) {
      /**
       * 日付を更新する頻度(ms)
       * @type {number | null}
       * @private
       */
      __publicField(this, "intervalId", null);
      /**
       * 日付更新対象オブジェクト
       * @type {UrlEntryWithDateFormat | null}
       * @private
       */
      __publicField(this, "targetEntry", null);
      /**
       * 日付更新対象一覧
       * @type { Record<string, UrlEntryWithDateFormat> }
       * @private
       */
      __publicField(this, "urlEntries", {
        TWEETDECK: UrlEntryWithDateFormatImpl.create(
          /^http(s)?:\/\/(x|twitter)\.com\/i\/tweetdeck/,
          "time.tweet-timestamp[datetime]",
          "text-align: right; font-size: 0.9rem; min-width: 55px;",
          "YY/MM/DD<br>(ddd)HH:mm"
        ),
        XCOM: UrlEntryWithDateFormatImpl.create(
          /^http(s)?:\/\/(x|twitter)\.com\/(?!i\/tweetdeck)/,
          "main section time[datetime]",
          "text-align: right; font-size: 0.9rem; min-width: 55px;",
          "YY/MM/DD(ddd) HH:mm"
        ),
        MISSKEY: UrlEntryWithDateFormatImpl.create(
          /^http(s)?:\/\/misskey\.io/,
          "article time[title]",
          "",
          "YY/MM/DD(ddd) HH:mm",
          "title"
        )
      });
      this.intervalMs = intervalMs;
    }
    /**
     * 指定された Location に基づいて、URL エントリを取得します。
     *
     * @param {Location} location - URL エントリを取得するための Location オブジェクト。
     * @returns {UrlEntryWithDateFormat | null} - 一致する URL エントリが見つかった場合は `UrlEntryWithDateFormat` オブジェクト、それ以外は `null`。
     * @private
     */
    getTargetService(location) {
      for (const key in this.urlEntries) {
        const entry = this.urlEntries[key];
        if (entry.is(location)) {
          return entry;
        }
      }
      return null;
    }
    /**
     * タイムスタンプの更新をスケジュールします。
     *
     * @param {Location} location - タイムスタンプの更新対象となる Location オブジェクト。
     * @returns {void}
     * @public
     */
    scheduleTimestampUpdate(location) {
      this.targetEntry = this.getTargetService(location);
      if (!this.targetEntry) return;
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
      }
      this.intervalId = window.setInterval(
        this.updateTimestamp.bind(this),
        this.intervalMs
      );
    }
    /**
     * 定期的に呼び出され、タイムスタンプを更新します。
     *
     * @returns {void}
     * @private
     */
    updateTimestamp() {
      var _a, _b;
      dayjs.locale((_a = this.targetEntry) == null ? void 0 : _a.locale);
      const elems = document.querySelectorAll(
        toStr((_b = this.targetEntry) == null ? void 0 : _b.selector)
      );
      elems.forEach((elem) => {
        var _a2;
        const timestamp = elem.attr(
          toStr((_a2 = this.targetEntry) == null ? void 0 : _a2.attributeName)
        );
        if (timestamp) {
          const newElem = this.createDateElem(timestamp);
          elem.replaceWith(newElem);
        }
      });
    }
    /**
     * タイムスタンプから新しい日付要素を作成します。
     *
     * @param {string} timestamp - 元のタイムスタンプ文字列。
     * @returns {Element} - 作成された日付要素。
     * @private
     */
    createDateElem(timestamp) {
      var _a, _b;
      const elem = document.createElement("span");
      elem.setAttribute("id", "m424-datetime");
      elem.setAttribute("datetime", timestamp);
      elem.setAttribute("style", toStr((_a = this.targetEntry) == null ? void 0 : _a.style));
      elem.innerHTML = toStr((_b = this.targetEntry) == null ? void 0 : _b.formatDate(timestamp));
      return elem;
    }
  }
  const interval_ms = 1e3;
  const updater = new TimestampUpdater(interval_ms);
  updater.scheduleTimestampUpdate(window.location);

})(dayjs);