import { Link } from "react-router-dom";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";

import { useLocation } from "react-router-dom";
const HeaderNavContent = () => {
  const { pathname } = useLocation();
  return (
    <>
      <nav className="nav main-menu ">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          <li
            className={`${
              isActiveParent(homeItems, pathname) ? "" : ""
            } dropdown`}
          >
          
          </li>
          <li
            className={`${
              isActiveParent(homeItems, pathname) ? "text-blue-950" : ""
            } dropdown`}
          >
            <span>AI Resum</span>
            <ul>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/">Resume Buider</Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/">Resume Score</Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/">Resume Enhancer</Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/">Match & Apply</Link>
              </li>
            </ul>
          </li>
          {/* End homepage menu items */}
          <li
            className={`${
              isActiveParent(employerItems, pathname) ||
              pathname?.split("/")[1] === "employers-dashboard"
                ? "current"
                : ""
            } dropdown`}
          >
            <span>Jobs</span>
            <ul>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/job-list-v7">Search by location</Link>
              </li>
              <li
                className={
                  pathname?.includes("/job-dashboard") ? "current" : ""
                }
              >
                {/* <Link to="/job-single-v1/1">Recent Jobs</Link> */}
                <Link to="/job-list-v7">Recent Jobs</Link>
              </li>
            </ul>
          </li>
          {/* End findjobs menu items */}

          <li
            className={`${
              isActiveParent(employerItems, pathname) ||
              pathname?.split("/")[1] === "employers-dashboard"
                ? "current"
                : ""
            } dropdown`}
          >
            <span>SentrySpot ID</span>
            <ul>
              {/*{employerItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={
                      isActiveParentChaild(item.items, pathname)
                        ? "current"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, pathname)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link to={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))} */}
              <li
                className={pathname?.includes("/sentry-spot") ? "current" : ""}
              >
                <Link to="/sentry-spot">sentryspot id </Link>
                <Link to="/candidates-dashboard/my-profile">
                  Candidate profile{" "}
                </Link>
                <Link to="/community">
                Community{" "}
                </Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-d  ashboard") ? "current" : ""
                }
              >
                <Link to="/employers-list-v2">Employers List</Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/employers-single-v1/1">
                  Employers Listing detail page
                </Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/employers-dashboard/dashboard">
                  Employers Dashboard
                </Link>
              </li>
            </ul>
          </li>
          {/* End Employers menu items */}

          {/* <li
            className={`${
              isActiveParent(candidateItems, pathname) ||
              pathname?.split("/")[1] === "candidates-dashboard"
                ? "current"
                : ""
                ? "current"
                : ""
            } dropdown`}
          >
            <span>Courses</span>
            <ul>
              {candidateItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={
                      isActiveParentChaild(item.items, pathname)
                        ? "current"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, pathname)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link to={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li
                className={
                  pathname?.includes("/candidates-dashboard/") ? "current" : ""
                }
              >
                <Link to="/candidates-list-v2">Trending courses</Link>
              </li>
              <li
                className={
                  pathname?.includes("/candidates-dashboard/") ? "current" : ""
                }
              >
                <Link to="/candidates-dashboard/">Security courses</Link>
              </li>
              <li
                className={
                  pathname?.includes("/candidates-dashboard/") ? "current" : ""
                }
              >
                <Link to="/candidates-dashboard/dashboard">
                  Candidates Dashboard
                </Link>
              </li>
            </ul>
          </li> */}
          {/* End Candidates menu items */}

          <li
            className={`${
              isActiveParentChaild(blogItems, pathname) ? "current" : ""
            } dropdown`}
          >
            <Link to={"https://blog.sentryspot.co.uk/"}> Resources</Link>
            {/* <ul>
              {blogItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, pathname) ? "current" : ""
                  }
                  key={i}
                >
                  <Link to={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul> */}
          </li>
          {/* End Blog menu items */}

          {/* reposting btn */}
          <li className="border h-[80%] p-0 m-0 "></li>
          <li className=" hover:bg-slate-200  p- rounded-md ml-2">
            <Link to="/">
              {" "}
              <span className="font-light"> Recruiting</span>? Post a job{" "}
            </Link>
          </li>

          {/*<li
            className={`${
              isActiveParentChaild(pageItems, pathname) ||
              isActiveParentChaild(shopItems[0].items, pathname)
                ? "current "
                : ""
            } dropdown`}
          >
            <span>Pages</span>
            <ul>
              {shopItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={`${
                      isActiveParentChaild(shopItems[0].items, pathname)
                        ? "current "
                        : ""
                    }`}
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, pathname)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link to={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              {pageItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, pathname) ? "current" : ""
                  }
                  key={i}
                >
                  <Link to={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
{
  /* <Link to="/candidates-single-v1/1">Security courses</Link> */
}
{
  (" ");
}
