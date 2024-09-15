// @ts-check

import dayjs from "dayjs";
import { UrlEntryWithDateFormat } from "./DOM/UrlEntryWithDateFormat";
import { UrlEntryWithDateFormatImpl } from "./DOM/impl/UrlEntryWithDateFormatImpl";
import { toStr } from "./util";

export class TimestampUpdater {
  /**
   * 日付を更新する頻度(ms)
   * @type {number | null}
   * @private
   */
  private intervalId: number | null = null;

  /**
   * 日付更新対象オブジェクト
   * @type {UrlEntryWithDateFormat | null}
   * @private
   */
  private targetEntry: UrlEntryWithDateFormat | null = null;

  /**
   * 日付更新対象一覧
   * @type { Record<string, UrlEntryWithDateFormat> }
   * @private
   */
  private urlEntries: Record<string, UrlEntryWithDateFormat> = {
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
    ),
  };

  /**
   * コンストラクタ
   *
   * @param {number} intervalMs - タイマーの間隔（ミリ秒）。
   * @constructor
   */
  constructor(private intervalMs: number) {}

  /**
   * 指定された Location に基づいて、URL エントリを取得します。
   *
   * @param {Location} location - URL エントリを取得するための Location オブジェクト。
   * @returns {UrlEntryWithDateFormat | null} - 一致する URL エントリが見つかった場合は `UrlEntryWithDateFormat` オブジェクト、それ以外は `null`。
   * @private
   */
  private getTargetService(location: Location): UrlEntryWithDateFormat | null {
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
  public scheduleTimestampUpdate(location: Location): void {
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
  private updateTimestamp(): void {
    dayjs.locale(this.targetEntry?.locale);
    const elems: NodeListOf<Element> = document.querySelectorAll(
      toStr(this.targetEntry?.selector)
    );
    elems.forEach((elem) => {
      const timestamp: string | null = elem.attr(
        toStr(this.targetEntry?.attributeName)
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
  private createDateElem(timestamp: string): Element {
    const elem: HTMLSpanElement = document.createElement("span");
    elem.setAttribute("id", "m424-datetime");
    elem.setAttribute("datetime", timestamp);
    elem.setAttribute("style", toStr(this.targetEntry?.style));
    elem.innerHTML = toStr(this.targetEntry?.formatDate(timestamp));
    return elem;
  }
}
