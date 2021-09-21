import { db } from "./firebae";

const fetchArticles = async (
  list,
  setArticles,
  setNextSnapshot,
  loading,
  setLoading
) => {
  try {
    await db
      .collection("news")
      .orderBy("created_at", "desc")
      .limit(30)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { author, html, imageUrl, title, create_at } = doc.data();
          list.push({
            id: doc.id,
            author: author,
            title: title,
            imageUrl: imageUrl,
            html: html,
            create_at: create_at,
          });
        });
        setArticles(list);

        setNextSnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);

        if (loading) {
          setLoading(false);
        }
      });
  } catch (e) {
    console.log(e);
  }
};

const fetchNextArticles = async (
  list,
  articles,
  nextSnapshot,
  setArticles,
  setNextSnapshot
) => {
  list = articles;
  try {
    return await db
      .collection("news")
      .orderBy("created_at", "desc")
      .startAt(nextSnapshot)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc);
          const { author, html, imageUrl, title, create_at } = doc.data();
          list.push({
            id: doc.id,
            author: author,
            title: title,
            imageUrl: imageUrl,
            html: html,
            create_at: create_at,
          });
        });
        setArticles(list);

        // 追加で記事を取得するのは一度だけなので以下のstateはnullに戻す
        setNextSnapshot(null);
      });
  } catch (e) {
    console.log(e);
  }
};
