import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/User";
import { APIBaseUrl } from "../../config/API";
import styles from "./AddProduct.module.css";



const allowedSubcategories = [
  {
    name: "סיוע ותרומה",
    subcategories: [
      "עודפי ייבול",
      "עודפי מזון ממסעדות",
      "שאריות של מזון לחיות מחמד",
      "שונות - מזון",
      "אבן ושיש",
      "זבל אורגני",
      "חומרי בנייה",
      "חומרים וציוד לעבודות יד",
      "מתכות",
      "נייר",
      "עץ",
      "פלסטיק",
      "צבעים",
      "שונות - חומר גלם",
      "אביזרים לנכים",
      "ציוד סיעוד",
      "תרופות",
      "שונות - ציוד רפואי",
      "טיפולים אלטרנטיביים",
      "מחשבים ואינטרנט",
      "סיוע לנזקקים",
      "עזרה בשימוש בקהילות אגורה",
      "שיעורי בית",
      "שיתוף טרמפים",
      "שונות - לימוד והוראה",
      "שונות - שירותים וסיוע",
      "שונות - ייעוץ",
      "קשות והצעות סיוע",
      "הובלות",
      "חילופי דירה",
      "לינת נופש",
    ],
  },
  {
    name: "תחביבים וספורט",
    subcategories: [
      "אביזרי בריאות וספא",
      "אומנויות לחימה",
      "גלישה",
      "טניס ומשחקי מחבט",
      "יוגה",
      "כדורים",
      "כושר",
      "ספורט אתגרי",
      "רכיבה על אופניים",
      "שחייה וצלילה",
      "שונות - ספורט",
      "אומנות ומלאכות",
      "דגמי מטוסים ומכוניות",
      "צילום",
      "ריקוד",
      "תפירה",
      "שונות - תחביבים",
      "בולים",
      "גלויות",
      "מטבעות ושטרות",
      "עתיקות",
      "שונות - אספנות",
      "אורגנים",
      "גיטרות",
      "כלי הקשה",
      "כלי נשיפה",
      "פסנתרים",
      "תופים",
      "שונות - כלי נגינה",
      "דיג",
      "טיפוס",
      "מחנאות וטיולים",
      "תירות",
      "שונות - בחוץ",
    ],
  },
  {
    name: "ספרים ומדיה",
    subcategories: [
      "אדריכלות ועיצוב",
      "אמנות וצילום",
      "אמנות ותחביבים",
      "ביוגרפיות וזכרונות",
      "בית וגן",
      "בריאות, גוף ונפש",
      "הורות ומשפחות",
      "היסטוריה וארכיאולוגיה",
      "טיולים וטבע",
      "כלכלה והשקעות",
      "כתבי קודש",
      "מדע",
      "מדעי המדינה",
      "מדריכי טיולים",
      "מדריכים מקצועיים וטכניים",
      "מחשבים ואינטרנט",
      "ספורט",
      "ספרי בישול",
      "עסקים וניהול",
      "פילוסופיה",
      "פסיכולוגיה וסוציולוגיה",
      "רוחניות ועידן חדש",
      "תווים ואקורדים",
      "תיאטרון ומחזות",
      "שונות - ספרי עיון",
      "מדע בדיוני ופנטזיה",
      "מסתורין ומותחנים",
      "סיפורים קצרים",
      "ספרות",
      "ספרי ילדים",
      "ספרים בשפות זרות",
      "ספרים לנוער",
      "רומנטיקה",
      "שירה",
      "שונות - סיפורת",
      "Science & nature",
      "אזרחות",
      "אנגלית",
      "אנציקלופדיות",
      "גיאוגרפיה",
      "דתות",
      "היסטוריה",
      "כימיה",
      "לשון",
      "מחשבים",
      "מילונים",
      "משפטים",
      "מתמטיקה",
      "ספרי לימוד",
      "פיזיקה",
      "פילוסופיה",
      "פסיכולוגיה וסוציולוגיה",
      "רפואה",
      "שפות",
      "שונות - ספרי לימוד",
      "אופנה וסגנון",
      "אמנות וצילום",
      "אתני",
      "בישול ומזון",
      "בני נוער",
      "בעלי חיים וחיות מחמד",
      "בריאות וכושר",
      "גברים",
      "דת",
      "הורות ומשפחות",
      "העשרה",
      "חדשות ופוליטיקה",
      "לבית ולגינה",
      "מגזיני נשים",
      "מגזינים לילדים ונוער",
      "מדע וטבע",
      "מוסיקה",
      "מחשבים ואינטרנט",
      "מסעות ונופים",
      "מפות",
      "מקומי ואזורי",
      "ניהול",
      "ספורט",
      "עתיקות ואספנות",
      "קומיקס",
      "רכב",
      "רפואי",
      "תחביבים ומלאכות",
      "שונות - מגזינים",
      "ווידאו",
      "מוסיקה (אלקטרונית)",
      "מוסיקה (אתנית)",
      "מוסיקה (ג'אז)",
      "מוסיקה (פופ)",
      "מוסיקה (קלאסית)",
      "מוסיקה (רוק)",
      "מוסיקה (שחורה)",
      "ספרי שמע",
      "תקליטים",
      "שונות - מוסיקה",
      "משחקי וידאו",
      "תוכנת מחשב",
    ],
  },
  {
    name: "מכשירי חשמל",
    subcategories: [
      "CD, DVD, BlueRay",
      "אביזרי מחשב",
      "אביזרי רשת",
      "אביזרים לטאבלטים",
      "גאדג'טים",
      "התקני אחסון",
      "חלקי מחשבים ניידים",
      "חלקי מחשבים שולחניים",
      "טאבלטים וקוראי ספרים אלקטרוניים",
      "כבלים ומחברים",
      "כרטיסי הרחבה",
      "לוחות אם ומעבדים",
      "מדפסות וסורקים",
      "מחשבי אפל",
      "מחשבים ניידים",
      "מחשבים שולחניים",
      "מסכים",
      "משחקי וידאו",
      "קונסולת משחק",
      "תוכנת מחשב",
      "שונות - מחשבים",
      "טלויזיות",
      "מאווררים",
      "מדיחי כלים",
      "מוצרי חשמל למטבח",
      "מזגנים",
      "מכונות כביסה ומייבשי כביסה",
      "מכשירי חימום",
      "מכשירי טיפוח",
      "מצלמות",
      "מקררים",
      "נגני מוסיקה ניידים",
      "סטריאו ואודיו",
      "שואבי אבק",
      "תאורה",
      "תנורים, מיקרוגלים, טוסטרים",
      "שונות - מוצרי חשמל",
      "אביזרים לטלפון נייד",
      "טלפונים ניידים",
      "טלפונים קווים",
    ],
  },
  {
    name: "ציוד לחיילים",
    subCategories: [
      "מוצרי היגיינה",
      "תיקי גב",
      "קסדות טקטיות",
      "מדים טקטיים",
      "אוכל יבש",
      "שקי שינה",
      "תוספות לנשק",
      "תחתונים",
      "גרביים",
      "חולצות טרמיות",
      "מוצרי היגיינה נשית",
      "וסטים",
      "נעלי הרים",
      "ביגוד חורף",
      "פקלי קפה",
      "אוהל",
      "חולצות דרייפיט",
      "לדרמנים וסכינים",
      "טואלטיקה",
      "מטענים ניידים",
      "תיקי רחצה",
      "פנסי ראש",
      "מגבות",
      "שק כביסה",
      "סיגריות",
      "מצתים",
      "סכיני גילוח",
      "שקיות חימום",
      "כובע גרב",
      "שונות",
    ],
  }
];

const conditions = [
  "חדש",
  "משומש במצב טוב",
  "משומש במצב בינוני",
  "משומש במצב רע",
  "לא נבדק",
];

export default function ProductForm() {
  const { user } = useContext(UserContext);

  const [condition, setCondition] = React.useState("");
  //change to category
  const [category, setCategory] = React.useState("");

  //create a new sub-category state
  const [subCategories, setSubCategories] = React.useState("");
console.log({subCategories,category, allowedSubcategories});
  // const { user } = useContext(UserContext);
  const [productCard, setProductCard] = useState({});
  const [img, setImg] = useState("");
  const [images, setImages] = React.useState([]);

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`${APIBaseUrl}/Products`);
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("error fetching Products: ", error);
    }
  };

  const changeHandler = (e) => {
    const newProductCard = { ...productCard };
    newProductCard[e.target.name] = e.target.value;
    setProductCard(newProductCard);
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userToken = localStorage.getItem("RUI_user_token");

        // Include the image URL in the product card data
        const productData = {
            ...productCard,
            imageUrl: img,
            category: category,
            subCategory: subCategories,
        };

        const response = await fetch(`${APIBaseUrl}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(productData),
        });

        if (response.ok) {
            alert("Product created successfully!");
        } else {
            alert("Failed to create product");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const preset_key = "ml_default";
const cloud_name = "djmlunvsl";

const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            if (data.secure_url) {
                setImg(data.secure_url);
            } else {
                console.error("Error uploading image to Cloudinary");
            }
        } else {
            console.error("Error uploading image to Cloudinary");
        }
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
    }
};
console.log({ productCard });
console.log("check", allowedSubcategories.find((mainCategory) => mainCategory.name === category))

  return (
    <>
      <div className={styles.page}>
        <div className={styles.formContayner}>
          <form onSubmit={handleSubmit}>
            <div>
              <h2>הוספת מוצר לתרומה</h2>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="כותרת"
                  fullWidth
                  onChange={changeHandler}
                  name="title"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="תיאור"
                  fullWidth
                  onChange={changeHandler}
                  name="decripion"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={allowedSubcategories}
                  name="category"
                  getOptionLabel={(category) => category.name}
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="קטגוריה" />
                  )}
                  onChange={(e, value) => {
                    //change category state
                    setCategory(value?.name);
                    console.log(value);
                  }}
                />
<Autocomplete
  // Change to category state when category is selected
  name="subCategory"
  options={
    allowedSubcategories
      .find((mainCategory) => mainCategory.name === category)
      ?.subcategories?.map((categoryData) => categoryData) || [] // Add a default empty array if subcategories are undefined
  }
  fullWidth
  renderInput={(params) => (
    <TextField {...params} label="תת קטגוריה" />
  )}
  onChange={(event, value) => {
    // Set new subcategories state
    setSubCategories(value);
    console.log(value);
  }}
/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="כתובת"
                  fullWidth
                  name="address"
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>מצב</InputLabel>
                  <Select
                    // value={condition}
                    name="condition"
                    onChange={handleConditionChange}
                  >
                    {conditions.map((condition, index) => (
                      <MenuItem key={index} value={condition}>
                        {condition}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="imageUrl"
                  label="תמונה"
                  type="file"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleFileChange}
                />
                {img && (
                  <div>
                    <img
                      src={img}
                      alt="Uploaded"
                      style={{ width: "100%", marginTop: "10px" }}
                    />
                  </div>
                )}
              </Grid>
            </Grid>
            <button className={styles.sendFormBtn}>סיום ושליחה</button>
          </form>
        </div>
      </div>
    </>
  );
}
