<template>
  <v-row justify="center">
    <v-col lg="8" sm="10" cols="12">
      <v-card id="about-card">
        <v-card-title>
          <span id="about-card-title">PolPaについて</span>
        </v-card-title>
        <v-card-text id="about-text">
          <p>PolPaは、学習時間に応じてレベルが上がる学習記録アプリです。</p>
          <p>ユーザー間での交流、ランキング、今週の目標など、学習のモチベーションを保つための機能が多数ありますので、ご活用ください。</p>
          <h2 id="about-subtitle">機能紹介</h2>
          <p id="function-introduction-subtitle">
            PolPaの主な機能を紹介します。
          </p>
          <div class="function-introduction">
            <h3 class="function-introduction-title">学習時間を記録する</h3>
            <img
            src="../assets/time-report.gif"
            alt="学習時間を記録する"
            class="introduction-img"
            />
            <img
            src="../assets/time-report-mobile.gif"
            alt="学習時間を記録する"
            class="introduction-img-mobile"
            />
            <br />
            <span class="usage">
              サイト右上の「時間を記録する」ボタンを押すと学習記録を作成することができます。
              <br />
              学習日時には一週間以内の日付を指定できます。<br />
              タグをつけて管理することもできます。
            </span>
          </div>
          <div class="function-introduction">
            <h3 class="function-introduction-title">ユーザーをフォローする</h3>
            <img
            src="../assets/follow.gif"
            alt="ユーザーをフォローする"
            class="introduction-img"
            />
            <img
            src="../assets/follow-mobile.gif"
            alt="ユーザーをフォローする"
            class="introduction-img-mobile"
            />
            <br />
            <span class="usage">
              ユーザーページから他のユーザーをフォローできます。
              <br />
              タイムラインにはフォローしているユーザーの記録が表示されます。
            </span>
          </div>
          <div class="function-introduction">
            <h3 class="function-introduction-title">タグをフォローする</h3>
            <img
            src="../assets/tag-follow.gif"
            alt="タグをフォローする"
            class="introduction-img"
            />
            <img
            src="../assets/tag-follow-mobile.gif"
            alt="タグをフォローする"
            class="introduction-img-mobile"
            />
            <br />
            <span class="usage">
              タグの詳細ページからタグをフォローできます。
              <br />
              タグフィードにはフォローしているタグの記録が表示されます。
            </span>
          </div>
          <div class="function-introduction">
            <h3 class="function-introduction-title">ユーザーを検索する</h3>
            <img
            src="../assets/search.gif"
            alt="ユーザーを検索する"
            class="introduction-img"
            />
            <img
            src="../assets/search-mobile.gif"
            alt="ユーザーを検索する"
            class="introduction-img-mobile"
            />
            <br />
            <span class="usage">
              検索ページからはユーザーを検索できます。
              <br />
              @(アットマーク)から始めるとユーザーIDで検索できます。
            </span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head () {
    return {
      title: 'About - PolPa'
    }
  }
}
</script>

<style scoped>
#about-card {
  padding: 20px;
}

#about-card-title {
  font-size: 1.4em;
}

#about-text {
  font-size: 0.9em;
}

#about-subtitle {
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 1.5em;
}

#function-introduction-subtitle {
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 10px;
}

.function-introduction {
  border-bottom: 1px solid #e8e8e8;
}

.function-introduction-title {
  font-size: 1.4em;
  margin-top: 20px;
  margin-bottom: 30px;
}

.introduction-img {
  max-width: 500px;
  max-height: 300px;
}

.introduction-img-mobile {
  display: none;
}

.usage {
  margin-top: 20px;
  margin-bottom: 10px;
  display: inline-block;
}

@media (max-width: 480px) {
  .introduction-img {
    display: none;
  }

  .introduction-img-mobile {
    display: inline-block;
    max-width: 300px;
    max-height: 500px;
  }
}
</style>
