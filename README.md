# tailwindcss-utilities

这是一个用于生成简化版 Tailwind CSS 工具类的项目。尽量剔除了与单位相关的样式，仅保留一些工具类，确保不会污染原有项目的 CSS

## 为什么需要这个项目

在某些项目中，无法引入完整的 Tailwind CSS，但又想使用其中的工具类，这个项目就是为了解决这个问题而生的。

这里挑选了 Tailwind CSS 中常用的工具类，生成全部的 CSS 内容。

⚠️ 由于是全量引入生成后的 CSS 内容，所以文件体积会比较大，请根据实际需要进行选择。

## 📦 使用

1. 下载文件

    ```bash
    curl -fsSL "https://gist.githubusercontent.com/TinsFox/d0e6d3bc26fd01bd1b771d0bb1ac1ec0/raw/d6dcf8c9a8c3adc2a1549afacf8627a1e4c5fa7e/utilities.css" > tailwindcss-utilities.css
    ```

2. 在项目中的入口 CSS 文件中引入

    ```css
    @import "tailwindcss-utilities.css";
    ```

3. Enjoy it!

## 🤝 贡献

欢迎提交 issues 和 pull requests 来改进这个项目。

## 📜 许可证

本项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件

---

💡 如果您觉得这个项目有用,请给它一个星标 ⭐️
