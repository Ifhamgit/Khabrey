import React from "react";

const NewsItem=(props)=>  {
  
    let { title, description, imageUrl, newsUrl, author, date, source } =
      props;
    return (
      <div className="my-3">
        <div className="card">
          <div>
            <span
              className=" badge rounded-pill bg-danger"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                right: "0",
              }}
            >
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://c.ndtvimg.com/2022-12/39k5ph88_modi-mamata_625x300_30_December_22.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                by {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            {/* We had to make a new object of "date" as "Date"
                to convert it into a GMT string" */}

            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              /*this target = "_blank" allows the link to open in a new tab */ className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewsItem;
