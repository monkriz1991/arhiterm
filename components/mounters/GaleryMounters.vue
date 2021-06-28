<template>
    <div class="monter-galery">
        <h2>Галерея работ</h2>
        <div class="monter-galery-block">
            <div class="monter-galery-img">
                <el-image 
                    :src="`https://new.arhiterm.by/media/0408e750c0278b84320d742987a273b0_0RxaqKa.jpg`" 
                    :preview-src-list="srcList">
                </el-image>
            </div>
            <div class="monter-galery-left">
                <span>Название работы</span>
                <strong><i class="el-icon-place"></i>Минск. ул. Казенца д.114</strong>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Iste ullam aliquam doloremque vel voluptatem quasi distinctio 
                    totam iusto libero sequi tempora possimus.
                </p>
            </div>
        </div>
        <div class="monter-galery-plus">Показать ещё...</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            srcList:['https://new.arhiterm.by/media/0408e750c0278b84320d742987a273b0_0RxaqKa.jpg'],
        }
    }
}
</script>