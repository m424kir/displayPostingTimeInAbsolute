// @ts-check

import dayjs from "dayjs";

/**
 * `DateFormatter`
 * @interface
 * @description 日付をフォーマットするためのインターフェース
 * @author M424
 */
export interface DateFormatter {
    /**
     * `Dayjs`の日付フォーマット
     * @type {string}
     * @example 'YYYY-MM-DD hh:mm:ss'
     */
    format: string;

    /**
     * ロケール情報
     * @type {string}
     * @example 'ja', 'en'
     */
    locale: string;

    /**
     * Dayjs指定のフォーマット形式の日付文字列に変換する
     * @param {dayjs.ConfigType} date dayjsで認識可能な日付形式
     * @return {string} 日付文字列
     */
    formatDate(date?: dayjs.ConfigType): string;
}
