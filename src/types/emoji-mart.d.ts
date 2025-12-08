declare module 'emoji-mart' {
  import * as React from 'react';

  export interface EmojiData {
    id: string;
    name: string;
    native: string;
    short_names: string[];
    skin?: number;
    colons?: string;
    emoticons?: string[];
  }

  export interface PickerProps {
    onSelect?: (emoji: EmojiData) => void;
    style?: React.CSSProperties;
    title?: string;
    emoji?: string;
    set?: 'apple' | 'google' | 'twitter' | 'facebook';
    perLine?: number;
    emojiSize?: number;
    sheetSize?: number;
    showPreview?: boolean;
    showSkinTones?: boolean;
    defaultSkin?: number;
    color?: string;
    backgroundImageFn?: (set: string, sheetSize: number) => string;
    i18n?: any;
  }

  export class Picker extends React.Component<PickerProps> {}
}
