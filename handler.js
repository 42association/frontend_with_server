// 環境変数を利用するためdotenvをインポート
import dotenv from "dotenv";
import request from "request";

// 環境変数の設定
dotenv.config();

const UID = process.env.UID;
const SECRET = process.env.SECRET;
const port = process.env.PORT; // デフォルト値の設定
const subaru = process.env.SUBARU; // デフォルト値の設定
const dbserver=process.env.DBSERVER;
const CALLBACK_URL = process.env.CALLBACK_URL;

// ルートエンドポイントのハンドラー
export const handleNew = (req, res) => {
  const authURL = `https://api.intra.42.fr/oauth/authorize?client_id=${UID}&redirect_uri=${encodeURIComponent(
    CALLBACK_URL
  )}&response_type=code`;
  res.render("new", { authURL });
};

export const handleCallback = (req, res) => {
  const { code } = req.query;
  const tokenURL = "https://api.intra.42.fr/oauth/token";

  request.post(
    tokenURL,
    {
      form: {
        grant_type: "authorization_code",
        client_id: UID,
        client_secret: SECRET,
        redirect_uri: CALLBACK_URL,
        code: code,
      },
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const tokenData = JSON.parse(body);
        const accessToken = tokenData.access_token;
        request.get(
          {
            url: "https://api.intra.42.fr/v2/me",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
          (error, response, body) => {
            if (!error && response.statusCode == 200) {
              const userData = JSON.parse(body);
              // login情報をフロントエンドに渡すためのリダイレクトを実行
              res.redirect(`/redirect?login=${userData.login}&subaru=${encodeURIComponent(subaru)}&dbserver=${encodeURIComponent(dbserver)}`);
            } else {
              res.send("Failed to retrieve user information.");
            }
          }
        );
      } else {
        res.send("Authentication failed!");
      }
    }
  );
};

// ルートエンドポイントのハンドラー
export const handleRedirect = (req, res) => {
  res.render("new_redirect");
};

// peopleエンドポイントのハンドラー
export const handlePeople = (req, res) => {
  const people = [
    {
      name: "Yamada Taro",
      timeEntered: "4/20 09:00",
      img: "https://42tokyo.jp/static/images/logo/42.svg",
    },
    {
      name: "Suzuki Ichiro",
      timeEntered: "4/20 10:15",
      img: "https://42tokyo.jp/static/images/logo/42.svg",
    },
    {
      name: "Tanaka Jiro",
      timeEntered: "4/20 11:30",
      img: "https://42tokyo.jp/static/images/logo/42.svg",
    },
  ];
  res.render("people", { people: people });
};

export const handleSojiday = (req, res) => {
  const now = new Date(); // 現在の日付と時刻を取得

  // YYYY-MM-DD 形式で日付をフォーマット
  const date = now.toISOString().split('T')[0];

  // パディングを使って月と日を取得（MMとDD形式）
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため、1を足す
  const day = String(now.getDate()).padStart(2, '0');

  const info = {
    haveto: ["Michael", "Dwight", "Jim", "Pam", "Angela", "Oscar", "Kevin"],
    did: ["Stanley", "Phyllis", "Andy", "Robert", "Ryan", "Kelly", "Toby"],
    date: date, // YYYY-MM-DD 形式の日付
    month: month, // MM 形式の月
    day: day, // DD 形式の日
  };

  res.render("soji", { info: info });
};


export const handleSojidid = (req, res) => {
  const info = {
    haveto: ["Michael", "Dwight", "Jim", "Pam", "Angela", "Oscar", "Kevin"],
    did: ["Stanley", "Phyllis", "Andy", "Robert", "Ryan", "Kelly", "Toby"],
  };
  res.render("soji_did", { info: info });
};

export const handleSojihaveto = (req, res) => {
  const info = {
    haveto: ["Michael", "Dwight", "Jim", "Pam", "Angela", "Oscar", "Kevin"],
    did: ["Stanley", "Phyllis", "Andy", "Robert", "Ryan", "Kelly", "Toby"],
  };
  res.render("soji_haveto", { info: info });
};
