// @ts-check

/**
 * `ElementSelector`
 * @interface
 * @description HTML要素のセレクタとスタイルを管理するインターフェース
 * @author M424
 */
export interface ElementSelector {
    /**
     * HTML要素のセレクタ
     * @type {string}
     */
    selector: string;

    /**
     * 対象セレクタに適用するスタイル
     * @type {string}
     */
    style: string;
}