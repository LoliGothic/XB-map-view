import Head from 'next/head';

export default function Seo() {
  return (
    <Head>
      <title>クロブレ共有マップ</title>
      <meta content="「ドラゴンクエスト ダイの大冒険 クロスブレイド」が設置されているお店の情報をマップで共有できます。" name="description" />
      <meta charset="utf-8" />
      <meta property="og:title" content="クロブレ共有マップ" />
      <meta property="og:description" content="「ドラゴンクエスト ダイの大冒険 クロスブレイド」が設置されているお店の情報をマップで共有できます。" />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://xb-map.azurewebsites.net" />
      <meta property="og:image" content="/text_header-title.png" />
      <meta property="og:site_name" content="クロブレ共有マップ" />
      <meta property="og:locale" content="ja_JP" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="keywords" content="ドラゴンクエスト,ダイの大冒険,クロスブレイド,クロブレ,共有,マップ" />
    </Head>
  )
}