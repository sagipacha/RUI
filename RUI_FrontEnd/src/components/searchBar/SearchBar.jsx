import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { APIBaseUrl } from "../../config/API";
import styles from './SearchBar.module.css'

export default function SearchBar({ setProducts }) {
  const subCategoryOptions = {
    "סיוע ותרומה": [
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
    "תחביבים וספורט": [
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
    "ספרים ומדיה": [
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
    "מכשירי חשמל": [
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
    "ציוד לחיילים": [
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
  };
  const [categories, setCategories] = useState([
    "מכשירי חשמל",
    "ספרים ומדיה",
    "ביגוד ואופנה",
    "תחביבים וספורט",
    "הורה וילד",
    "סיוע ותרומה",
    "ציוד לחיילים",
    "שונות",
  ]);
  const [subCategories, setSubCategories] = useState([]);
  const [conditionOptions, setConditionOptions] = useState([
    "חדש",
    "משומש במצב טוב",
    "משומש במצב בינוני",
    "משומש במצב רע",
    "לא נבדק",
  ]);
  const [condition, setCondition] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setSubCategories(subCategoryOptions[category]);
  };
  const handleSubCategoryChange = async (subCategory) => {
    setSelectedSubCategory(subCategory);
  };
  const handleConditionChange = async (condition) => {
    setSelectedCondition(condition);
  };

  console.log([selectedCategory, selectedSubCategory, selectedCondition]);

  const searchFunction = async () => {
    const response = await axios.post(
      `${APIBaseUrl}/products/searchByFilters`,
      {
        category: selectedCategory,
        subCategory: selectedSubCategory,
        condition: selectedCondition,
      }
    );
    setProducts(response.data);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <Stack spacing={4} direction="row">
        <Autocomplete
          id="category-dropdown"
          options={categories}
          onChange={(event, category) => handleCategoryChange(category)}
          renderInput={(params) => (
            <TextField {...params} label="קטגוריה" sx={{ width: "200px" }} />
          )}
        />
        <Autocomplete
          id="subcategory-dropdown"
          options={subCategories}
          onChange={(event, subCategory) =>
            handleSubCategoryChange(subCategory)
          }
          renderInput={(params) => (
            <TextField {...params} label="תת-קטגוריה" sx={{ width: "200px" }} />
          )}
        />
        <Autocomplete
          id="condition-dropdown"
          options={conditionOptions}
          onChange={(event, condition) => handleConditionChange(condition)}
          renderInput={(params) => (
            <TextField {...params} label="מצב מוצר" sx={{ width: "200px" }} />
          )}
        />
        <button className={styles.searchBtn}
        onClick={searchFunction}>חיפוש</button>
      </Stack>
    </div>
  );
}
