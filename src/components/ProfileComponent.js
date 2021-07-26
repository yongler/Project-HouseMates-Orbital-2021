import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { ROOMMATE_FORM, HOUSING_FORM } from "../globalConstants";
import { setChatUser } from "../redux/chat/actions";

const ProfileComponent = ({
  name,
  desc,
  pic,
  scoreListObj,
  unreadMsgs,
  type,
  id,
  chatUser,
  setChatUser,
}) => {
  // Hooks
  const history = useHistory();

  // Handlers
  const handleClick = () => {
    if (type === ROOMMATE_FORM) {
      history.push(`/roommates/${id}`);
    } else if (type === HOUSING_FORM) {
      history.push(`/housings/${id}`);
    } else {
      setChatUser(chatUser);
      history.push("/chat");
    }
  };
  return (
    <Link onClick={handleClick} style={{ textDecoration: "none" }}>
      <Card style={{ display: "flex", flexDirection: "row", margin: 10 }}>
        <CardMedia image={pic} title={name} style={{ width: 100 }} />
        <CardActionArea>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography>{name}</Typography>
              {type === ROOMMATE_FORM ? (
                <Chip
                  label={scoreListObj[id]?.score + "%"}
                  color="secondary"
                  size="small"
                />
              ) : !type ? (
                <>
                  {unreadMsgs !== 0 && (
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: "red",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                      }}
                    >
                      <div style={{ color: "white", textAlign: "center" }}>
                        {unreadMsgs}
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
            <Typography variant="body1" color="textSecondary">
              {desc &&
                (desc.length > 25 ? desc.substring(0, 25) + "..." : desc)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

const mapDispatchToProps = {
  setChatUser,
};

export default connect(null, mapDispatchToProps)(ProfileComponent);
