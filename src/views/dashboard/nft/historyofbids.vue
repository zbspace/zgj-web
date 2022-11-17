<template>
    <div class="card">
        <div class="card-header d-flex align-items-center">
            <ul class="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" data-bs-toggle="tab" href="#home1" role="tab">
                        预警提醒
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#profile1" role="tab">
                        通知提醒
                    </a>
                </li>
            </ul>
        </div>
        <div class="card-tabs">
        
        </div>
        <div class="card-body">
            <div class="table-responsive table-card">
                <div style="max-height: 380px;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item list-group-item-action">
                            <div class="d-flex align-items-center">
                                <div class="ms-3 flex-grow-1">
                                    <a href="#!" class="stretched-link">
                                        <h6 class="fs-14 mb-1">盖前文件OCR核验异常</h6>
                                    </a>
                                    <p class="mb-0 text-muted">系统监测到【文件核验-验证】在进行盖前强制OCR核验，检测到文件有差异，请即时确认。操作人:【刘娟】，操作时间:【2022-10-27 18:03】</p>
                                </div>
                                <div>
                                    <!-- <h6>174.36 ETH</h6> -->
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item list-group-item-action">
                            <div class="d-flex align-items-center">
                                <div class="ms-3 flex-grow-1">
                                    <a href="#!">
                                        <h6 class="fs-14 mb-1">归档文件OCR核验异常</h6>
                                    </a>
                                    <p class="mb-0 text-muted">系统监测到【文件核验1006】在进行归档文件OCR核验，检测到文件有差异，请即时确认。操作人:【岳云】，操作时间:【2022-10-27 09:39】</p>
                                </div>
                                <div>
                                    <!-- <h6>346.47 ETH</h6> -->
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item list-group-item-action">
                            <div class="d-flex align-items-center">
                                <div class="ms-3 flex-grow-1">
                                    <a href="#!">
                                        <h6 class="fs-14 mb-1">下盖超时未缩回（手动版）</h6>
                                    </a>
                                    <p class="mb-0 text-muted">手动版智能印章【公章二代】侦测到下盖超时未缩回。操作人:【李斌】，操作时间:【2022-10-26 16:39:19】</p>
                                </div>
                                <div>
                                    <!-- <h6>349.08 ETH</h6> -->
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item list-group-item-action">
                            <div class="d-flex align-items-center">
                                <div class="ms-3 flex-grow-1">
                                    <a href="#!">
                                        <h6 class="fs-14 mb-1">移动侦测</h6>
                                    </a>
                                    <p class="mb-0 text-muted">智能印章侦测到【公章一代】在盖章过程中被移动了。操作人:【侯麦】，操作时间:【2022-10-26 11:15:21】</p>
                                </div>
                                <div>
                                    <!-- <h6>852.34 ETH</h6> -->
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item list-group-item-action">
                            <div class="d-flex align-items-center">
                                <div class="ms-3 flex-grow-1">
                                    <a href="#!">
                                        <h6 class="fs-14 mb-1">非法使用</h6>
                                    </a>
                                    <p class="mb-0 text-muted">【手动版未回零位按压测试】非法使用警告，可能存在破坏印章情况。操作人:【江艳】，最近发生时间:【2022-10-25 09:40:03】</p>
                                </div>
                                <div>
                                    <!-- <h6>4.071 ETH</h6> -->
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.card-tabs{
    width: 20rem;
}
.card-header{
    padding-bottom: 0%;
    padding-top: 0%;
}
.mb-3{
    margin-bottom: 0% !important;
}
</style>