<template>
    <div class="container">
        <Breadcrumb/>
        <h1 class="h1-mounter">
            {{mounter.whoiam.first_name}}
            {{mounter.whoiam.last_name}}
        </h1>
        <div class="mounter-tags">
            <i class="el-icon-setting"></i>
          <strong v-for="(tag,k) in mounter.tag_s" :key="k">{{tag.name}}</strong>
        </div>
        <div class="mounter-img">
            <el-image
            :src="mounter.whoiam.img"
            fit="contain"
            lazy
            >
            </el-image>
        </div>

        <div class="mounter-section">
            <p>{{mounter.description}}</p>
            <div class="mounter-region">
                <i class="el-icon-place"></i>
                <span>Минск</span>
            </div>
            <div class="mounter-phone" v-for="(p,k) in mounter.phone_s" :key="k">
                <i class="el-icon-phone-outline"></i>
                <a href="" >{{p.phone_number}}</a>
            </div>
        </div>
        <GaleryMounters :portfolio="mounter.portfolio"/>
    </div>
</template>

<script>
import GaleryMounters from '~/components/mounters/GaleryMounters.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'
export default {
    async asyncData ({ app, params, route, error }) {
        try {
            let mounter = await app.store.dispatch('mounters/getMounter',params.id)
          console.log(mounter)
            return{mounter}
        } catch (err) {
        return error({
            statusCode: 404,
            message: 'Товар не найдена или сервер не доступен'
        })
        }
    },
    components:{
        GaleryMounters,
        Breadcrumb
    },
    data() {

      return{

      }
    },
    head() {
        return {
        title: this.mounter.whoiam.first_name+' '+this.mounter.whoiam.last_name,
        meta: [
            // hid is used as unique identifier. Do not use `vmid` for it as it will not work
            {
            hid: 'description',
            name: 'description',
            content:  this.mounter.description
            },
            {
                hid: 'og:title',
                name: 'og:title',
                content: this.mounter.whoiam.first_name+' '+this.mounter.whoiam.last_name,
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: `${this.mounter.whoiam.img}`,
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: this.mounter.description,
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: `https://arhiterm.by/mounter/${this.mounter.id}`,
            },
        ]
        }
    }
}
</script>
