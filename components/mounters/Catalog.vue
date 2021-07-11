<template>
    <div class="mount-catalog">
        <el-row :gutter="20">
            <el-col
            :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
            v-for="(mounter,idx) in mounters" :key="idx"
            >
                <div class="mounters-list-block">
                    <div class="mounters-list-img">
                        <el-image
                        :src="mounter.whoiam.img"
                        fit="contain"
                        lazy
                        >
                        </el-image>
                    </div>
                    <div class="mounters-block-left">
                        <nuxt-link
                        :to="`/mounter/${mounter.id}`"
                        >
                            {{mounter.whoiam.first_name}}
                            {{mounter.whoiam.last_name}}
                        </nuxt-link>
                        <div class="mounters-block-left-tags">
                            <i class="el-icon-setting"></i>
                            <strong v-for="(i,k) in mounter.tag_s" :key="k">{{i.name}}</strong>
                        </div>
                        <p>{{mounter.description}}</p>
                        <span><i class="el-icon-place"></i>Минск</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    data() {
        return{

        }
    },
    computed:{
        ...mapGetters({
          mounters:'mounters/mountertList',
        }),
    },
    methods:{

    },
    mounted(){

    }
}
</script>
