import Layout from "../components/PageLayout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";

const ShowLink = ({ show }) => (
    <li key={show.id}>
        <Link href="/p/[id]" as={`/p/${show.id}`}>
            <a>{show.name}</a>
        </Link>
        <style jsx>{`
            li {
                list-style: none;
                margin: 5px 0;
            }

            a {
                text-decoration: none;
                color: blue;
            }

            a:hover {
                opacity: 0.6;
            }
        `}</style>
    </li>
);

const Index = props => {
    const { data, error } = useSWR("/api/randomQuote", url =>
        fetch(url).then(r => r.json())
    );

    const author = data?.author;
    let quote = data?.quote;

    if (!data) quote = "Loading...";
    if (error) quote = "Failed to fetch the quote.";

    return (
        <Layout>
            <h1>Batman TV Shows</h1>
            <ul>
                {(props.shows || []).map(show => (
                    <ShowLink key={show.id} show={show} />
                ))}
            </ul>
            <div className="center">
                <div className="quote">{quote}</div>
                {author && <span className="author">- {author}</span>}
            </div>
            <style jsx>{`
                h1,
                a {
                    font-family: "Arial";
                }

                ul {
                    padding: 0;
                }

                .quote {
                    font-family: cursive;
                    color: #e243de;
                    font-size: 24px;
                    padding-bottom: 10px;
                }
                .author {
                    font-family: sans-serif;
                    color: #559834;
                    font-size: 20px;
                }
            `}</style>
        </Layout>
    );
};

Index.getInitialProps = async function() {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
    const data = await res.json();
    console.log("tvmaze: ", data.length);
    return { shows: data.map(e => e.show) };
};

export default Index;
