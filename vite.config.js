import vue from '@vitejs/plugin-vue'
import path from 'path';

export default () => {
    return {
        plugins: [vue()],
        base: "./",
        // 本地反向代理解决浏览器跨域限制
        server: {
            hmr: true,
            host: true,
            port: 8423,
            open: true, // 运行自动打开浏览器
            proxy: {
                "/dev-api": {
                    target: "https://awave.world:8443",
                    changeOrigin: true,
                    rewrite: (p) => p.replace(/^\/dev-api/, ""),
                },
            },
        },
        resolve: {
            // Vite路径别名配置
            alias: {
                '@': path.resolve('./src')
            }
        },
        build: {
            outDir: 'dist'
        }
    }
};