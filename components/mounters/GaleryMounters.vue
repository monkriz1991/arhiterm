<template>
    <div class="monter-galery">
        <h2>Галерея работ</h2>
        <div class="monter-galery-block" v-for="(p,k) in portfolio" :key="k">
            <div class="monter-galery-img">
                <el-image
                    v-for="(i,k) in p.images"
                    :src="i.img"
                    :preview-src-list="p.images.map(x=>x.img)">
                </el-image>
            </div>
            <div class="monter-galery-left">
                <span>{{p.title}}</span>
                <strong><i class="el-icon-place"></i>{{p.address}}</strong>
                <p>
                    {{p.description}}
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
    },
  props:['portfolio'],
  methods:{

  }
}
</script>
