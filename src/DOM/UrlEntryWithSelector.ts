// @ts-check

import { UrlEntry } from "./UrlEntry";
import { ElementSelector } from "./ElementSelector";

/**
 * `UrlEntryWithSelector`
 * @interface
 * @description `UrlEntry`にセレクタとスタイル情報を追加したインターフェース
 * @extends UrlEntry
 * @extends ElementSelector
 * @author M424
 */
export interface UrlEntryWithSelector extends UrlEntry, ElementSelector {}
