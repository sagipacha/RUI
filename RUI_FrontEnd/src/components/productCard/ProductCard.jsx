import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import axios from "axios";
import styles from './ProductCard.module.css';
import { APIBaseUrl } from "../../config/API";
import UserProvider, { UserContext } from "../../context/User";
import { useContext } from "react";
import { getLinearProgressUtilityClass } from "@mui/material";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard(props) {
  const user = useContext(UserContext)
  const { product,favorite,i,isFavComp } = props;
  console.log(product);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const formatDate = (timestampString) => {
    const timestamp = new Date(timestampString);
    const year = timestamp.getFullYear();
    const month = (timestamp.getMonth() + 1).toString().padStart(2, "0");
    const day = timestamp.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  const handleFavoriteClick = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("RUI_user_token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.put(
        `${APIBaseUrl}/favorites/favoriteProduct/${id}`,
        null, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Favorite added/removed successfully:", response.data.updatedFavorites);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={product?.userId?.firstName + " " + product?.userId?.lastName}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={formatDate(product?.timeStamp)}
      />
      <CardMedia
        component="img"
        height="194"
        image={product?.imageUrl}
        alt="Product Image"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <IconButton 
  aria-label="add to favorites"
  onClick={() => handleFavoriteClick(product?.productId)}
>
{!isFavComp ? (
  favorite?.some(item => item.productId === product.productId) ? (
    <FavoriteIcon color="error" />
  ) : (
    <FavoriteIcon />
  )
) : <FavoriteIcon color="error" />}


</IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>פרטים נוספים:</Typography>

          <Typography paragraph>
            {product?.category}
            <KeyboardArrowLeftIcon />
            {product?.subCategory}
          </Typography>
          <Typography paragraph>כתובת: {product?.address}</Typography>
          
          <Typography paragraph>מספר טלפון: {product?.userId?.phoneNumber}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
