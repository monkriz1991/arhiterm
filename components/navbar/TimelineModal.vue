<template>
    <el-popover
        placement="bottom"
        width="200"
        popper-class="work-poper"
        trigger="click">
        <el-button
        icon="el-icon-time"
        class="button-work"
        slot="reference">
        График
        </el-button>
        <div>
        <div
        class="work-div"
        v-for="(work,k) in worktime" :key="k"
        v-if="work.week_day==0&&work.week_day<=4"
        >
            <strong class="work-day">Понедельник - Четверг</strong>
            <span class="work-time">{{work.start_time.substring(0,5)}}</span>
            <b>-</b>
            <span class="work-time">{{work.end_time.substring(0,5)}}</span>
            <strong class="work-comment">{{work.comment}}</strong>
        </div>
        <div
        class="work-div"
        v-for="(work,k) in worktime" :key="k"
        v-if="work.week_day==4"
        >
        
            <strong class="work-day">Пятница</strong>
            <span class="work-time">{{work.start_time.substring(0,5)}}</span>
            <b>-</b>
            <span class="work-time">{{work.end_time.substring(0,5)}}</span>
            <strong class="work-comment">{{work.comment}}</strong>
        </div>
        <div>
            <strong class="work-day">Суббота / Воскресенье</strong>
            <strong class="work-comment">Выходной</strong>
        </div>
        </div>
    </el-popover>
</template>


<script>
export default {
  props:['worktime'],
  data() {
    return {
    };
  },
  methods:{
  },

};
</script>