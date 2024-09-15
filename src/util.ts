// @ts-check

/**
 * 引数がnull|undefinedの場合、空文字を返却する
 * @param value
 * @returns
 */
export function toStr(value: string | null | undefined): string {
    return value ?? '';
}


declare global {
    /**
     * `Element`インターフェイスの拡張
     */
    interface Element {
        /**
         * 属性値を取得または設定します。
         * @param {string} attr - 取得または設定する属性名
         * @param {string} [value] - 属性に設定する値。指定しない場合は値を取得します。
         * @returns {string} - 属性の値を返します。属性が設定されていない場合は空文字を返します。
         */
        attr(attr: string, value?: string): string;
    }
}
Element.prototype.attr = function(this: Element, attr: string, value?: string): string {
    if( value === undefined ) {
        return this.getAttribute(attr) || '';
    }
    this.setAttribute(attr, value);
    return '';
}
