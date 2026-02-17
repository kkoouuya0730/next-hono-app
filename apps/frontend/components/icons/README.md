# Icons Design System

このディレクトリは、アプリケーション全体で使用するSVGアイコンの共通実装を管理します。

本モジュールは単なるSVGラッパーではなく、  
**再利用性・拡張性・アクセシビリティ・デザイン変更耐性**を考慮した  
小規模デザインシステムとして設計しています。

---

## 🎯 設計目的

- アイコンAPIの統一
- バリアント（outline / solid）の一貫管理
- アクセシビリティの標準化
- デザイン変更への耐性確保
- 責務分離による保守性向上

---

## 🧩 アーキテクチャ設計

### icon.types.ts

すべてのアイコンが従うAPI契約を定義します。

```ts
export type IconVariant = "outline" | "solid";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
  variant?: IconVariant;
};
```

#### 意図

- APIを中央管理する
- 型の単一責任化

---

### BaseIcon.tsx（SVGコンテナ層）

SVG描画の共通責務を持ちます。

#### 管理している責務

- viewBox
- fill / stroke 制御
- strokeWidth管理
- aria制御
- forwardRef対応

#### variantによる描画制御

```ts
fill={isSolid ? "currentColor" : "none"}
stroke={isSolid ? "none" : "currentColor"}
strokeWidth={isSolid ? undefined : 1.5}
```

#### アクセシビリティ制御

```ts
const isDecorative = !ariaLabel && !title;
```

- title / aria-labelあり → role="img"
- なし → aria-hidden=true

#### 設計意図

- 共通ロジックを1箇所に集中させる
- 各アイコンから描画設定責務を排除する
- デザイン変更時の影響範囲を最小化する

---

### 各アイコン（例: HomeIcon）

各アイコンは「パス定義のみ」を責務とします。

```tsx
const paths = {
  outline: <path />,
  solid: <path />,
};

export const HomeIcon = ({ variant = "outline", ...props }: IconProps) => {
  return (
    <BaseIcon variant={variant} {...props}>
      {paths[variant]}
    </BaseIcon>
  );
};
```

#### 設計意図

- ロジック分岐を排除（if文を使わない）
- variantをデータとして扱う
- 宣言的に記述する

---

## 🎨 Variant設計方針

<HomeIcon variant="solid" />

### なぜコンポーネントを分けないのか？

命名爆発を防ぐため。

HomeIcon  
HomeSolidIcon  
HomeOutlineIcon  
HomeActiveIcon

この増殖を避け、APIを統一する。

### 拡張性

```ts
type IconVariant = "outline" | "solid" | "duotone";
```

型拡張のみで対応可能。

---

## ♿ アクセシビリティ設計思想

アイコンは2種類に分類します。

1. 装飾アイコン
2. 意味を持つアイコン

### 装飾アイコン

<HomeIcon />

```
aria-hidden=true
```

### 意味を持つアイコン

<HomeIcon title="ホームへ移動" />

```
role="img"
```

#### 意図

- アクセシブルネームを明示する
- 誤実装を防ぐ
- SVG単体での意味付与を可能にする

---

## 🔥 この設計のメリット

1. API一貫性  
   すべてのアイコンが同じ使い方を持つ。

2. 責務分離  
   BaseIcon = コンテナ責務  
   各Icon = パス責務  
   types = 契約責務

3. DRY原則の遵守  
   描画ロジックの重複排除。

4. デザイン変更耐性  
   strokeWidth変更などを一括制御可能。

5. 拡張性  
   variant追加が低コスト。

6. 宣言的設計  
   分岐ロジックではなく、データ構造で管理。

---

## 🧠 設計上の判断基準

この実装では以下を重視しています。

- コンポーネントの単一責任
- APIの安定性
- 将来拡張の容易性
- UIライブラリ化可能な構造
- アクセシビリティの標準化

---

## 📌 実装ルール

- すべてのアイコンは BaseIcon を使用する
- variant分岐は paths オブジェクトで管理する
- fill / stroke ロジックは BaseIcon に書く
- 共通型は icon.types.ts に集約する
