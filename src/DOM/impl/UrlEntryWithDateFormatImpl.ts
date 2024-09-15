// @ts-check

import dayjs from "dayjs";
import { UrlEntryWithDateFormat } from "../UrlEntryWithDateFormat";

/**
 * `UrlEntryWithDateFormatImpl`
 * @class
 * @description URLパターン、セレクタ、スタイル、日付フォーマット、ロケール情報を管理するクラス
 * @implements UrlEntryWithDateFormat
 */
export class UrlEntryWithDateFormatImpl implements UrlEntryWithDateFormat {
  /** URLパターンを表す正規表現
   * @type {RegExp}
   * @public
   */
  public pattern: RegExp;

  /**
   * HTML要素のセレクタ
   * @type {string}
   * @public
   */
  public selector: string;

  /**
   * 対象セレクタに適用するスタイル
   * @type {string}
   * @public
   */
  public style: string;

  /**
   * `Dayjs`の日付フォーマット
   * @type {string}
   * @example 'YYYY-MM-DD hh:mm:ss'
   * @public
   */
  public format: string;

  /**
   * ロケール情報
   * @type {string}
   * @example 'ja', 'en'
   * @public
   */
  public locale: string;

  /**
   * 既存の日付情報取得用の属性名
   * @type {string}
   * @public
   */
  public attributeName: string;

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
  constructor(
    pattern: RegExp,
    selector: string,
    style: string = "",
    format: string = "YY/MM/DD(ddd) HH:mm",
    attributeName: string = "datetime",
    locale: string = "ja"
  ) {
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
  public is(location: Location): boolean {
    return this.pattern.test(location.href);
  }

  /**
   * Dayjs指定のフォーマット形式の日付文字列に変換する
   * @param {dayjs.ConfigType} date dayjsで認識可能な日付形式
   * @return {string} 日付文字列
   */
  public formatDate(date?: dayjs.ConfigType): string {
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
  public static create(
    pattern: RegExp,
    selector: string,
    style: string = "",
    format: string = "YY/MM/DD(ddd) HH:mm",
    attributeName: string = "datetime",
    locale: string = "ja"
  ): UrlEntryWithDateFormatImpl {
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
