// @ts-check

/**
 * `UrlEntry`
 * @interface
 * @description URLパターンにマッチングするかを判定する基本インターフェース
 * @author M424
 */
export interface UrlEntry {
    /** URLパターンを表す正規表現
     * @type {RegExp}
     */
    pattern: RegExp;

    /**
     * 指定されたLocationがこのパターン二マッチするか判定します
     * @param {Location} location - 判定対象のLocationオブジェクト
     * @return {boolean} true if パターンマッチ
     */
    is(location: Location): boolean;
}
