import Client from "@/Client";

export default (client: Client) => {
    if (!process.env.DOG_API) {
        client.disabled.set('dog', true);
        client.out('warn', "The 'dog' command has been disabled. This is due to a missing DOG_API field in the environment variables.")
    };
    if (!process.env.CAT_API) {
        client.disabled.set('cat', true);
        client.out('warn', "The 'cat' command has been disabled. This is due to a missing CAT_API field in the environment variables.");
    };
};