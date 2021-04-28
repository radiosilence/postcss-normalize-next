import postcssBrowserComments from "postcss-browser-comments-next";
import postcssImportNormalize from "./lib/postcssImportNormalize";
import postcssNormalize from "./lib/postcssNormalize";
import { create } from "./lib/util";

const plugin = (opts) => {
	opts = create(opts);

	const commentsTransformer = postcssBrowserComments(opts).Once;
	const normalizeTransformer = postcssNormalize(commentsTransformer, opts);
	const postcssImportConfig = postcssImportNormalize(commentsTransformer, opts);

	return {
		postcssPlugin: "postcss-normalize",
		Once(root) {
			return normalizeTransformer(root);
		},
		postcssImport: postcssImportConfig,
	};
};

plugin.postcss = true;

export default plugin;
