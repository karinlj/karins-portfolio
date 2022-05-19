import React, { useState, useEffect } from "react";
import monstera_lighter_s from "../../images/monstera_lighter_s.jpg";
import { client } from "../../client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import leaves_small from "../../images/leaves_small.jpg";

const Home = () => {
  const [skillItems, setSkillItems] = useState(null);
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const getAboutData = () => {
      client
        .getEntries({
          content_type: "aboutData",
        })
        .then((response) => {
          console.log("response_aboutData: ", response.items[0]);
          setAboutData(response.items[0]);
        })
        .catch((error) => console.log("error", error));
    };

    const getSkillsItems = () => {
      client
        .getEntries({
          content_type: "skill",
          order: "fields.sortNumber",
        })
        .then((response) => {
          console.log("response_skill: ", response.items);
          setSkillItems(response.items);
        })
        .catch((error) => console.log("error", error));
    };
    getAboutData();
    getSkillsItems();
  }, []);

  return (
    <main className="home">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className="home_img_wrapper"
              style={{
                background: `url(${monstera_lighter_s})`,
              }}
            >
              <section className="heading_box">
                {aboutData ? (
                  <h1 className="home_name cursive">
                    {aboutData.fields.heading}
                    <span className="home_name_sub cursive">
                      {aboutData.fields.text}
                    </span>
                  </h1>
                ) : (
                  ""
                )}
              </section>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="home_text">
              <h2 className="text-center cursive">About Me</h2>
              {aboutData
                ? documentToReactComponents(aboutData.fields.aboutContent)
                : ""}
            </div>
          </div>
        </div>
      </div>

      <section className="skills_section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <section className="boxes">
                <h2 className="text-center cursive">Skills</h2>

                <div className="boxes_inner">
                  {skillItems &&
                    skillItems.map((entry, index) => {
                      return (
                        <div
                          className="box"
                          style={{ background: `url(${leaves_small})` }}
                          key={entry.sys.id}
                        >
                          <div className="text_part_outer">
                            <div className="text_part_inner">
                              <i
                                className={`fas fa-${entry.fields.icon} boxes_icon`}
                                aria-hidden="true"
                              ></i>
                              <i
                                className={`fab fa-${entry.fields.icon} boxes_icon`}
                                aria-hidden="true"
                              ></i>
                              <h3 className="heading"> {entry.fields.title}</h3>
                              <div className="text">
                                {documentToReactComponents(
                                  entry.fields.content
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Home;
