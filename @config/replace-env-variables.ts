import MarkdownIt from 'markdown-it'

export default function replaceEnvVariables(md: MarkdownIt) {
    const env = process.env;

    const regexWithDecode = /%25([A-Z_\d]+)%25/g; // 匹配转译后的 %ENV_VAR%
    const regex = /%([A-Z_\d]+)%/g; // 匹配 %ENV_VAR%

    function replaceFunction(state: MarkdownIt.StateCore): void {
        state.tokens.forEach((token) => {
            if (token.type === 'inline') {
                token.children?.forEach((child) => {
                    if (child.type === 'link_open' && child.attrs) {
                        const hrefIndex = child.attrIndex('href');
                        if (hrefIndex !== -1) {
                            const hrefValue = child.attrs[hrefIndex][1];
                            if (regexWithDecode.test(hrefValue)) {
                                child.attrs[hrefIndex][1] = hrefValue.replace(regexWithDecode, (match, envVal) => {
                                    return env[envVal] || match;
                                });
                            }
                        }
                    } else if (child.type === 'text') {
                        if (regex.test(child.content)) {
                            child.content = child.content.replace(regex, (match, envVal) => {
                                return env[envVal] || match;
                            });
                        }
                    }
                });
            }
        });
    }

    md.core.ruler.before('replacements', 'replace_env_variables', replaceFunction);
}
